import React from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
interface props {
    value: string
    onChange: any
}
const CkeEditor: React.FC<props> = ({ value, onChange }) => {
    return (<>
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    </>);
}

export default CkeEditor;