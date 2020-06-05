import React, { useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import apis from '../../util/apis';
import { Toast } from 'antd-mobile';
import './index.less';

// const handleStopRolling = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     event.nativeEvent.stopImmediatePropagation();
// };

function Map(props) {
    const { config, onCancel, onSelected, initValue, isView } = props;
    const { mapType, secretKey, webserviceUrlDO } = config;
    // const [location, setLocation] = useState(null);

    useEffect(() => {
        Toast.loading('loading...', 0);
    }, []);

    const onLoad = useCallback(() => {
        Toast.hide();
    }, []);

    const handleComplate = useCallback(
        location => {
            const { url, urlMethod = 'post' } = webserviceUrlDO;
            const { latlng, poiaddress, poiname } = location;
            Toast.loading('loading...', 0);
            return apis
                .fetchDynamicUri({
                    method: urlMethod,
                    url,
                    params: {
                        query: {
                            key: secretKey,
                            location: `${latlng.lat},${latlng.lng}`,
                        },
                        serviceApi: 'https://apis.map.qq.com/ws/geocoder/v1',
                    },
                })
                .then(data => {
                    if (!data || data.code !== 0) return;
                    let area = {
                        name: `${poiname}(${poiaddress})`,
                        address: poiaddress,
                        longitude: latlng.lng,
                        latitude: latlng.lat,
                        pointWkt: `POINT(${latlng.lng} ${latlng.lat})`,
                        pointWkt2000: '',
                    };

                    if (mapType === 'amap') {
                        const ac = data.data.regeocode.addressComponent;
                        area = {
                            ...area,
                            adcode: ac.adcode,
                            citycode: ac.citycode,
                            country: ac.country,
                            towncode: ac.towncode,
                            province:
                                ac.province === ac.city ? '' : ac.province,
                            city: ac.city,
                            district: ac.district,
                            street: ac.streetNumber
                                ? ac.streetNumber.street
                                : '',
                        };
                    } else if (mapType === 'qqmap') {
                        const ac = data.data.result.ad_info;
                        area = {
                            ...area,
                            adcode: ac.adcode, //区划编码
                            citycode: ac.city_code,
                            country: ac.nation, //国
                            province:
                                ac.province === ac.city ? '' : ac.province, //省
                            city: ac.city, //城市
                            district: ac.district, //区
                            street: ac.street, //街道
                        };
                    }
                    onSelected(area);
                    onCancel();
                })
                .finally(() => {
                    Toast.hide();
                });
        },
        [mapType, onCancel, onSelected, secretKey, webserviceUrlDO],
    );

    useEffect(() => {
        function message(event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            const loc = event.data;
            if (loc && loc.module === 'locationPicker') {
                handleComplate(loc);
            }
        }
        window.addEventListener('message', message, false);

        return () => {
            window.removeEventListener('message', message);
        };
    }, [handleComplate]);

    let center = '';
    let url = '';
    if (initValue && initValue.longitude) {
        center = isView
            ? `${initValue.latitude},${initValue.longitude}`
            : `${initValue.longitude},${initValue.latitude}`;
    }

    if (mapType === 'amap') {
        url = `https://m.amap.com/picker/?center=${center}&key=3d5c1c6169c64554d6f9fcca35d4abff&total=20&keywords=街道`;
    } else if (mapType === 'qqmap') {
        url = isView
            ? `https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${center}&tonav=0&key=63QBZ-B5GKV-46RPH-UCUF2-K5TUJ-OKBAK&referer=wx_map`
            : `https://apis.map.qq.com/tools/locpicker?coord=${center}&search=1&type=1&key=63QBZ-B5GKV-46RPH-UCUF2-K5TUJ-OKBAK&referer=wx_map&total=20`;
    }
    // https://apis.map.qq.com/tools/geolocation?key=VFUBZ-JIR3D-Z2M4H-PPAGG-G5KVQ-S3F2S&referer=locationPicker
    return (
        <div className="dynamic_form_flxed">
            <iframe
                onLoad={onLoad}
                width="100%"
                height="100%"
                src={url}
            ></iframe>
            <div className="dynamic_form_map_close_btn" onClick={onCancel}>
                关闭
            </div>
        </div>
    );
}

Map.propTypes = {
    onCancel: PropTypes.func,
    onSelected: PropTypes.func,
    config: PropTypes.object,
    initValue: PropTypes.object,
    isView: PropTypes.bool,
};

export default Map;
