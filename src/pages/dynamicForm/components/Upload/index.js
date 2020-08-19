import { forwardRef } from 'react';
import { Upload, Button } from 'antd';

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

export default forwardRef((props, ref) => {
    console.log(props);
    const { ...other } = props;

    return (
        <Upload
            ref={ref}
            {...other}
            getValueFromEvent={normFile}
            valuePropName="fileList"
        >
            <Button>Click to upload</Button>
        </Upload>
    );
});
