/* eslint-disable */
export const popUpImage = (function() {
    const maskStyle = {
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 10000,
        left: 0,
        fontSize: '12px',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const wrapStyle = {
        position: 'relative',
        padding: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 14px 2px rgba(0, 0, 0, 0.20)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxSizing: 'border-box',
    };
    const imgStyle = {
        display: 'block',
        width: '100%',
        height: '100%',
    };
    const iconStyle = {
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        float: 'right',
        'line-height': '30px',
        'margin-left': '10px',
    };
    const iconWrapStyle = {
        position: 'fixed',
        right: '20px',
        top: '10px',
        background: 'rgba(0, 0, 0, 0.6)',
        'z-index': 1,
        'font-size': '25px',
        color: '#fff',
        'text-align': 'center',
    };
    const flexStyle = { display: 'flex' };
    const noneStyle = { display: 'none' };
    // 间距
    const space = 10;
    // 图片放大移动时 ，上下左右留白的距离
    const moveSpace = 20;
    const store = {
        // 放大移动事件添加 标识
        isAddEvent: false,
        // img 外层 dom 引用
        stie: null,
        // 0 正常； 1 放大 ； 2 缩小
        status: 0,
    };

    const mask = document.createElement('div');
    let sh = (store.sh =
        window.innerHeight || document.documentElement.clientheight);
    let sw = (store.sw =
        window.innerWidth || document.documentElement.clientWidth);
    mask.style.width = `${sw}px`;
    mask.style.height = `${sh}px`;
    css(mask, maskStyle);
    const iconWrap = document.createElement('ul');
    css(iconWrap, iconWrapStyle);
    mask.appendChild(iconWrap);

    let close = `<li title="关闭" class="close" style="${stringify(
        iconStyle,
    )}"><i aria-label="close" class="anticon anticon-close"><svg viewBox="64 64 896 896" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></li>`;
    let zoom = `<li title="放大" class="zoom" style="${stringify(
        iconStyle,
    )}"><i aria-label="大" class="anticon anticon-fullscreen"><svg viewBox="64 64 896 896" class="" data-icon="fullscreen" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"></path></svg></i></li>`;
    let shrink = `<li title="缩小" class="shrink" style="${stringify(
        iconStyle,
    )}"><i aria-label="小" class="anticon anticon-fullscreen-exit"><svg viewBox="64 64 896 896" class="" data-icon="fullscreen-exit" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path></svg></i></li>`;
    iconWrap.innerHTML = close + shrink + zoom;

    close = iconWrap.querySelector('.close');
    zoom = iconWrap.querySelector('.zoom');
    shrink = iconWrap.querySelector('.shrink');
    mask.addEventListener('mousewheel', e => {
        e.stopPropagation();
        e.preventDefault();
    });
    close.addEventListener('click', () => {
        css(mask, noneStyle);
        if (store.stie) {
            mask.removeChild(store.stie);
            store.stie = null;
            store.status = 0;
        }
    });
    zoom.addEventListener('click', () => {
        if (!store.stie || store.status !== 2) return;
        if (store.sw < store.imgW || store.sh < store.imgH) {
            store.status = 1;
            css(store.stie, {
                position: 'absolute',
                cursor: 'pointer',
                top: `${moveSpace}px`,
                left: `${moveSpace}px`,
                width: `${store.imgW + 10}px`,
                height: `${store.imgH + 10}px`,
            });
            store.stie.addEventListener('mousedown', event => {
                if (event.button === 0) {
                    event.stopPropagation();
                    event.preventDefault();
                    const wrap = store.stie;
                    const { imgW, imgH, sw, sh } = store;
                    // top left 最大值 与最小值 只能取其之间 包含自身

                    const w =
                        imgW > sw
                            ? [sw - imgW - 2 * moveSpace, moveSpace]
                            : [-2 * moveSpace, sw - imgW + moveSpace];
                    const h =
                        imgH > sh
                            ? [sh - imgH - 2 * moveSpace, moveSpace]
                            : [2 * moveSpace, sh - imgH + moveSpace];

                    let { left, top } = window.getComputedStyle(wrap);
                    left = parseInt(left);
                    top = parseInt(top);
                    const { clientX, clientY } = event;
                    const move = e => {
                        const x = e.clientX;
                        const y = e.clientY;
                        let topValue = top + (y - clientY);
                        let leftValue = left + (x - clientX);
                        topValue =
                            topValue < h[0]
                                ? h[0]
                                : topValue > h[1]
                                ? h[1]
                                : topValue;
                        leftValue =
                            leftValue < w[0]
                                ? w[0]
                                : leftValue > w[1]
                                ? w[1]
                                : leftValue;
                        wrap.style.top = `${topValue}px`;
                        wrap.style.left = `${leftValue}px`;
                    };
                    document.addEventListener(
                        'mouseup',
                        () => {
                            document.removeEventListener('mousemove', move);
                        },
                        { once: true },
                    );
                    document.addEventListener('mousemove', move);
                }
            });
        }
    });
    shrink.addEventListener('click', () => {
        if (!store.stie || store.status !== 1) return;
        store.status = 2;
    });
    document.body.appendChild(mask);
    function popUp(src, flag = false) {
        if (!src) return;
        const wrap = (store.stie = document.createElement('div'));
        css(wrap, wrapStyle);
        if (flag) {
            store.sh = sh =
                window.innerHeight || document.documentElement.clientheight;
            store.sw = sw =
                window.innerWidth || document.documentElement.clientWidth;
            css(mask, {
                width: `${sw}px`,
                height: `${sh}px`,
            });
        }
        const img = new Image();
        css(img, imgStyle);
        img.addEventListener('load', e => {
            const w = (store.imgW = e.target.width);
            const h = (store.imgH = e.target.height);
            const obj = {};
            if (!(w + 2 * space <= sw) || !(h + 2 * space <= sh)) {
                const wratio = w / sw;
                const hratio = h / sh;
                if (hratio > wratio) {
                    // 宽
                    obj.height = sh - 2 * space;
                    const actualwidth = Math.floor((w / h) * obj.height);
                    obj.width = actualwidth;
                } else {
                    obj.width = sw - 2 * space;
                    const actualHeight = Math.floor((h / w) * obj.width);
                    obj.height = actualHeight;
                }
            } else {
                obj.width = w;
                obj.height = h;
            }
            store.computedW = obj.width;
            store.computedH = obj.height;
            if (store.imgW > sw || store.imgH > sh) {
                store.status = 2;
            }
            obj.width += 'px';
            obj.height += 'px';

            css(wrap, obj);
            wrap.appendChild(img);
            css(mask, flexStyle);
        });
        img.addEventListener('error', () => {
            if (store.stie) {
                wrap.removeChild(store.stie);
                store.stie = null;
            }
            wrap.appendChild('图片加载失败,请尝试刷新');
            css(mask, flexStyle);
        });
        mask.appendChild(wrap);
        img.setAttribute('src', src);
    }
    function css(dom, obj) {
        for (const k in obj) {
            dom.style[k] = obj[k];
        }
    }
    function stringify(obj) {
        return Object.keys(obj)
            .map(v => `${v}:${obj[v]}`)
            .join(';');
    }
    return popUp;
})();
