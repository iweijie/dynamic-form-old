/* eslint-disable */
const popUpImage = (function() {
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
        width: '100%',
        height: '100vh',
        boxShadow: '0 2px 14px 2px rgba(0, 0, 0, 0.20)',
        // borderRadius: '4px',
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
        // 'margin-left': '10px',
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
    iconWrap.innerHTML = close;

    close = iconWrap.querySelector('.close');
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

    mask.addEventListener('click', () => {
        css(mask, noneStyle);
        if (store.stie) {
            mask.removeChild(store.stie);
            store.stie = null;
            store.status = 0;
        }
    });
    document.body.appendChild(mask);
    function popUp(src, flag = false) {
        if (!src) return;
        const wrap = (store.stie = document.createElement('div'));
        css(wrap, wrapStyle);
        css(mask, flexStyle);
        const iframe = document.createElement('iframe');
        wrap.appendChild(iframe);
        mask.appendChild(wrap);
        iframe.src = src;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        // iframe.type = 'application/pdf';
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
export default popUpImage;
