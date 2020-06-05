import React, { useEffect, useReducer, useCallback } from 'react';

import PropTypes from 'prop-types';
import apis from '../../util/apis';
import { noop } from '../../util/index';
import { searchIcon } from '../../util/svg';
import { InputItem, Toast, Icon, Button } from 'antd-mobile';
import './index.less';

const getInitialData = (initValue, isSelectedPerson) => ({
    // 不同情况下 展示方式
    // TODO  1：组织架构；  2：搜索用户列表
    type: 1,
    // 搜索用户数据
    searchUserList: [],
    // 标记当前层级
    unfoldKeys: [],
    //数据源
    datasource: {},
    // 当前展示的 部门 或者 部门人员列表
    currentData: [],
    // 加载中
    loading: false,
    // 人员关键字搜索
    searchValue: '',
    // 已搜索的关键字
    searchkeys: '',
    // 选中的人员 或者部门
    selectedItems: initValue || [],
});

function personReducer(state, action) {
    const { type, payload } = action;
    // const { unfoldKeys, datasource } = state;
    switch (type) {
        // case 'keys+':
        //     unfoldKeys.push(payload);
        //     return { ...state, unfoldKeys: [...unfoldKeys] };
        // case 'keys-':
        //     unfoldKeys.pop();
        //     return { ...state, unfoldKeys: [...unfoldKeys] };
        case 'setData':
            return { ...state, ...payload };
        case 'loading':
            return {
                ...state,
                loading: payload !== undefined ? payload : !state.loading,
            };
        case 'searchValue':
            return { ...state, searchValue: payload };
        // case 'search':
        //     return { ...state, searchValue: payload };
        case 'selected':
            return { ...state, selectedItems: payload };
        default:
            return state;
    }
}

const handleStopRolling = event => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
};

function getCurrentData(unfoldKeys, datasource) {
    let index = 0;
    let sign = true;
    let currentData = datasource || {};
    while (sign) {
        const findIndex =
            currentData.children &&
            currentData.children.length &&
            // eslint-disable-next-line no-loop-func
            currentData.children.findIndex(
                data => data.id === unfoldKeys[index],
            );
        const findData =
            currentData.children && currentData.children[findIndex];
        if (findData && findData.id) {
            currentData = findData;
            index++;
        } else {
            sign = false;
        }
    }
    return currentData;
}

const getDepartment = ({ item, handleClickItem }) => {
    const { name, id } = item;
    return (
        <li onClick={() => handleClickItem(item)} key={id}>
            <div className={'item-left'}>
                <div className={'item-left-arrow-wrap'}></div>
            </div>
            <div className={'item-right'}>
                <p>{name}</p>
            </div>
        </li>
    );
};

getDepartment.propTypes = {
    item: PropTypes.object,
    handleClickItem: PropTypes.func,
};
// isSelectePreson
const getUserItem = ({ item, selectedItems, handleSelected }) => {
    const { name, userName, id, deptName } = item;
    const findIndex = selectedItems.findIndex(select => select.id === id);
    const isChecked = findIndex !== -1;
    return (
        <li onClick={() => handleSelected(item)} key={id}>
            <div className={'item-left'}>
                {isChecked ? (
                    <div className={'item-left-icon-wrap-active'}>
                        <Icon type="check-circle" />
                    </div>
                ) : (
                    <div className={'item-left-icon-wrap'}></div>
                )}
            </div>
            <div className={'item-right item-right-select'}>
                <p>
                    {name || userName}{' '}
                    {deptName ? <span>({deptName})</span> : null}
                </p>
            </div>
        </li>
    );
};

getUserItem.propTypes = {
    item: PropTypes.object,
    handleSelected: PropTypes.func,
    selectedItems: PropTypes.array,
};

const getSelectDepartment = ({
    item,
    selectedItems,
    handleSelected,
    handleClickItem,
}) => {
    const { name, id } = item;
    const findIndex = selectedItems.findIndex(select => select.id === id);
    const isChecked = findIndex !== -1;
    return (
        <li key={id}>
            <div onClick={() => handleSelected(item)} className={'item-left'}>
                {isChecked ? (
                    <div className={'item-left-icon-wrap-active'}>
                        <Icon type="check-circle" />
                    </div>
                ) : (
                    <div className={'item-left-icon-wrap'}></div>
                )}
            </div>
            <div onClick={() => handleClickItem(item)} className={'item-right'}>
                <p>{name}</p>
            </div>
        </li>
    );
};

getSelectDepartment.propTypes = {
    item: PropTypes.object,
    handleClickItem: PropTypes.func,
    handleSelected: PropTypes.func,
    selectedItems: PropTypes.array,
};

const formatData = (list = []) =>
    list.map(person => ({
        id: person.id,
        userAccount: person.userAccount,
        userName: person.name || person.userName,
    }));

function SelectPerson(props) {
    const { onCancel = noop, onSelected = noop, isMultiple, initValue } = props;
    const isSelectedPerson = true;
    const [data, dispatch] = useReducer(
        personReducer,
        getInitialData(initValue, isSelectedPerson),
    );
    const {
        unfoldKeys,
        datasource,
        searchValue,
        currentData,
        searchUserList,
        searchkeys,
        type,
        selectedItems,
    } = data;
    const getUserList = useCallback(
        keys => {
            const isRoot = keys === 0;
            const newUnfoldKeys = isRoot ? [] : [...unfoldKeys, keys];
            const current = getCurrentData(newUnfoldKeys, datasource);
            if (
                current &&
                current.id &&
                current.children &&
                current.children.length
            ) {
                dispatch({
                    type: 'setData',
                    payload: {
                        currentData: current.children,
                        unfoldKeys: newUnfoldKeys,
                    },
                });
                return;
            }
            Toast.loading('Loading...', 0);
            apis.getDepartmentAndUserList({ id: keys })
                .then(response => {
                    if (response && response.code === 0) {
                        let data = response.data || [];
                        if (!isSelectedPerson) {
                            data = data.filter(d => d.type === 0);
                        }
                        current.children = data;
                        if (!current.id) {
                            current.id = keys;
                        }
                        dispatch({
                            type: 'setData',
                            payload: {
                                currentData: data,
                                unfoldKeys: newUnfoldKeys,
                            },
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    Toast.hide();
                });
        },
        [unfoldKeys, datasource, isSelectedPerson],
    );
    useEffect(() => {
        // 初始化获取值
        getUserList(0);

        const body = document.querySelector('body');
        body.style.height = '100vh';
        body.style.overflow = 'hidden';

        return () => {
            const body = document.querySelector('body');
            body.style.height = 'auto';
            body.style.overflow = 'visible';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // 上一页
    const previousHandle = useCallback(() => {
        if (!unfoldKeys || !unfoldKeys.length) return;
        const newUnfoldKeys = [...unfoldKeys];
        newUnfoldKeys.pop();
        const current = getCurrentData(newUnfoldKeys, datasource);
        if (
            current &&
            current.id !== undefined &&
            current.children &&
            current.children.length
        ) {
            dispatch({
                type: 'setData',
                payload: {
                    currentData: current.children,
                    unfoldKeys: newUnfoldKeys,
                },
            });
        }
    }, [dispatch, unfoldKeys, datasource]);

    const handleClickItem = useCallback(
        item => {
            const { id } = item;
            getUserList(id, 'next');
        },
        [getUserList],
    );
    // 正反选
    const handleSelected = useCallback(
        item => {
            let list;
            const index = selectedItems.findIndex(data => data.id === item.id);
            if (!isMultiple) {
                list = index === -1 ? [item] : [];
            } else {
                if (index !== -1) {
                    selectedItems.splice(index, 1);
                } else {
                    selectedItems.push(item);
                }
                list = [...selectedItems];
            }
            dispatch({
                type: 'selected',
                payload: list,
            });
        },
        [dispatch, isMultiple, selectedItems],
    );

    const handleComplate = useCallback(() => {
        onSelected(formatData(selectedItems), selectedItems);
        onCancel();
    }, [onCancel, onSelected, selectedItems]);

    const handleInputChange = useCallback(
        value => {
            dispatch({
                type: 'searchValue',
                payload: value,
            });
        },
        [dispatch],
    );

    const onSearch = useCallback(() => {
        if (!searchValue || (searchkeys && searchkeys === searchValue)) {
            dispatch({
                type: 'setData',
                payload: {
                    type: 1,
                    searchkeys: '',
                    searchValue: '',
                    searchUserList: [],
                },
            });
            return;
        }

        Toast.loading('Loading...', 0);
        apis.getUserListByKeyWords({
            keyWords: searchValue,
        })
            .then(data => {
                if (data && data.code === 0) {
                    dispatch({
                        type: 'setData',
                        payload: {
                            searchkeys: searchValue,
                            type: 2,
                            searchUserList: data.data || [],
                        },
                    });
                }
            })
            .finally(() => {
                Toast.hide();
            });
    }, [dispatch, searchkeys, searchValue]);

    const hasPrevious = !!unfoldKeys.length;
    const searchText =
        searchkeys && searchkeys === searchValue ? '返回' : '搜索';
    return (
        <div className={'select-person-wrap'}>
            <div className={'select-person-header'}>
                <div onClick={onCancel}>关闭</div>
                <p>已选择{selectedItems.length}项</p>
                <div onClick={handleComplate}>完成</div>
            </div>
            {isSelectedPerson ? (
                <div className={'select-person-search-input-wrap'}>
                    <div className="select-person-search-input">
                        <i className="icon">{searchIcon}</i>
                        <InputItem
                            type="search"
                            onChange={handleInputChange}
                            value={searchValue}
                            onVirtualKeyboardConfirm={onSearch}
                            clear
                            placeholder="请输入关键字"
                        ></InputItem>
                    </div>
                    <Button
                        className="select-person-search-btn"
                        onClick={onSearch}
                    >
                        {searchText}
                    </Button>
                </div>
            ) : null}
            {type === 1 ? (
                <div
                    onScroll={handleStopRolling}
                    className={`${
                        hasPrevious ? 'can-previous' : ''
                    } select-person-list-wrap`}
                    key="select-person-list-wrap"
                >
                    {hasPrevious ? (
                        <div className="previous-btn-wrap">
                            <div
                                className="previous-btn"
                                onClick={previousHandle}
                            >
                                <span className="previous-btn-icon">
                                    <Icon type="left" />
                                </span>
                                <span className="previous-btn-text">
                                    返回上一页
                                </span>
                            </div>
                        </div>
                    ) : null}
                    <div className={'select-person-list-content'}>
                        <ul className={'select-person-list'}>
                            {!currentData || !currentData.length ? (
                                <li className={'list-item-empty'}>
                                    当前无选项
                                </li>
                            ) : (
                                currentData.map(item =>
                                    isSelectedPerson
                                        ? item.type === 1
                                            ? getUserItem({
                                                  item,
                                                  selectedItems,
                                                  handleSelected,
                                                  handleClickItem,
                                              })
                                            : getDepartment({
                                                  item,
                                                  selectedItems,
                                                  handleSelected,
                                                  handleClickItem,
                                              })
                                        : getSelectDepartment({
                                              item,
                                              selectedItems,
                                              handleSelected,
                                              handleClickItem,
                                          }),
                                )
                            )}
                        </ul>
                    </div>
                </div>
            ) : (
                <div
                    onScroll={handleStopRolling}
                    className="select-person-list-wrap"
                    key="search-person-list-wrap"
                >
                    <div className={'select-person-list-content'}>
                        <ul className={'select-person-list'}>
                            {!searchUserList || !searchUserList.length ? (
                                <li className={'list-item-empty'}>
                                    当前无选项
                                </li>
                            ) : (
                                searchUserList.map(item =>
                                    getUserItem({
                                        item,
                                        selectedItems,
                                        handleSelected,
                                        handleClickItem,
                                    }),
                                )
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

SelectPerson.propTypes = {
    onCancel: PropTypes.func,
    onSelected: PropTypes.func,
    isSelectedPerson: PropTypes.bool,
    isMultiple: PropTypes.bool,
    initValue: PropTypes.any,
};

export default SelectPerson;
