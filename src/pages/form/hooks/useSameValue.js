import { useRef, useEffect } from 'react';
// 用于比较前后render 值是否一致

const useSameValue = value => {
    const val = useRef(value);
    const isMounted = useRef(false);
    if (isMounted.current) {
        const text = `当前值在前后render中是: %c ${
            val.current === value ? '一致' : '不一致'
        }`;
        console.log(text, 'color:#ff2323;');
    }

    useEffect(() => {
        isMounted.current = true;
    }, []);

    val.current = value;
};

export default useSameValue;
