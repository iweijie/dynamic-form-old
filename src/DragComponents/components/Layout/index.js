import React from 'react';
import styles from './index.less';
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
}

export default React.forwardRef((props, ref) => {
    return <EditorText {...props} forwardRef={ref} />;
});
