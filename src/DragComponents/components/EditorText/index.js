import 'braft-editor/dist/index.css';
import styles from './index.less';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContainerType } from '../../constant';
import {
    controls,
    emojis,
    fontSizes,
    defaultStyles,
    fontFamilies,
} from './data';
import { get, isEqual } from 'lodash';

class EditorText extends React.Component {
    constructor(props) {
        super();
        this.state = {
            editorState: BraftEditor.createEditorState(null),
            contentStyle: {
                ...get(props, 'styles', {}),
                ...defaultStyles,
            },
        };
    }

    componentDidUpdate(preProps) {
        const { styles } = this.props;
        if (!isEqual(styles, preProps.styles)) {
            this.setState({
                ...(styles || {}),
                ...defaultStyles,
            });
        }
    }

    render() {
        const { forwardRef } = this.props;
        const { editorState, contentStyle } = this.state;
        return (
            <div
                ref={this.handleGetWrap}
                className={styles['braft-editor-wrap']}
            >
                <BraftEditor
                    ref={forwardRef}
                    emojis={emojis}
                    contentStyle={contentStyle}
                    value={editorState}
                    fontSizes={fontSizes}
                    fontFamilies={fontFamilies}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                    controls={controls}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    handeleGetHtml = () => {
        const { editorState } = this.state;
        const a = editorState.toHTML();
        const b = editorState.toJS();
        const c = editorState.toRAW();
    };

    handleGetWrap = ref => {
        this._wrap = ref;
        this._bfControlbar = ref.querySelector('.bf-controlbar');
    };

    handleChange = editorState => {
        this.setState({ editorState });
    };

    handleOnFocus = () => {
        if (!this._bfControlbar) return;
        if (this._bfControlbar) {
            this._bfControlbar.style.display = 'block';
        }

        document.body.addEventListener('click', this.handleFindInEdit);
    };

    handleFindInEdit = e => {
        let node = e.target;
        let inEdit = false;
        while (node) {
            if (node === this._wrap) {
                inEdit = true;
                break;
            } else {
                node = node.parentNode;
            }
        }
        if (!inEdit) {
            if (this._bfControlbar) {
                this._bfControlbar.style.display = 'none';
            }

            document.body.removeEventListener('click', this.handleFindInEdit);
        }
    };
}

const Text = React.forwardRef((props, ref) => {
    return <EditorText {...props} forwardRef={ref} />;
});

export default {
    title: '文本编辑框',
    code: 'Input',
    icon: 'iconinput',
    ponput: [ContainerType.Form, ContainerType.Component],
    template: () => {},
    render: () => <Text />,
    trigger: ['onChange', 'onBlur', 'onFocus'],
    actions: {},
    config: {},
    panel: [],
};
