import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import styles from './index.less';
import { Modal } from 'antd-mobile';

const err = <div className={styles['err']}>PDF 加载错误...</div>;
const loading = <div className={styles['loading']}>PDF 加载中...</div>;

class MyApp extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
        width: window.innerWidth || document.documentElement.clientWidth,
    };

    render() {
        const { numPages, width } = this.state;
        const { visible, onCancel, id } = this.props;
        return (
            <Modal
                className={`${styles['approve-model']}`}
                maskClosable={true}
                visible={visible}
                // animationType="slide-up"
                onClose={onCancel}
            >
                <div onClick={onCancel} className={styles['close']}>
                    <svg
                        viewBox="64 64 896 896"
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                    </svg>
                </div>
                <Document
                    error={err}
                    loading={loading}
                    className={styles['wrap']}
                    renderMode={'canvas'}
                    file={`/meeting-service/pdf/view/${id}`}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    {new Array(numPages).fill('').map((item, index) => (
                        <Page
                            width={width}
                            key={index}
                            pageNumber={index + 1}
                        />
                    ))}
                </Document>
            </Modal>
        );
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };
}

export default MyApp;
