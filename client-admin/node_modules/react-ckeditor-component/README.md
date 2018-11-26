# react-ckeditor-component

**React component for CKEditor**

## Installation

[![react-ckeditor-component](https://nodei.co/npm/react-ckeditor-component.png)](https://npmjs.org/package/react-ckeditor-component)

## Usage

```js
import CKEditor from "react-ckeditor-component";

class Example extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: 'content',
        }
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }
    
    onChange(evt){
      console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
    }
    
    onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }
    
    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }

    render() {
        return (
            <CKEditor 
              activeClass="p10" 
              content={this.state.content} 
              events={{
                "blur": this.onBlur,
                "afterPaste": this.afterPaste,
                "change": this.onChange
              }}
             />
        )
    }
}
```

The package also includes an in-built example under the `/example` folder. Run the sample application by cloning project and running npm start.

## Props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 15%;">name</th>
        <th style="width: 15%;">type</th>
        <th style="width: 15%;">default</th>
        <th style="width: 15%;">mandatory</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>content</td>
          <td>any</td>
          <td></td>
          <td>No</td>
          <td>Default value to be set in CKEditor</td>
        </tr>
        <tr>
          <td>onChange (Deprecated)</td>
          <td>function</td>
          <td></td>
          <td>No</td>
          <td>Deprecated in v1.0.6. Is now handled via events prop.</td>
        </tr>
        <tr>
          <td>config</td>
          <td>object</td>
          <td></td>
          <td>No</td>
          <td>Configs to be passed in CKEditor</td>
        </tr>
        <tr>
          <td>isScriptLoaded</td>
          <td>boolean</td>
          <td>false</td>
          <td>No</td>
          <td>Pass true if ckeditor script is already loaded in project</td>
        </tr>
        <tr>
          <td>scriptUrl</td>
          <td>string</td>
          <td>Standard CKEditor</td>
          <td>No</td>
          <td>The CKEditor script that needs to be loaded. Pass a custom script with plugins if you need a customized CKEditor.</td>
        </tr>
        <tr>
          <td>activeClass</td>
          <td>string</td>
          <td></td>
          <td>No</td>
          <td>Any Css class to be used with CKEditor container div.</td>
        </tr>
        <tr>
          <td>events (New)</td>
          <td>object</td>
          <td></td>
          <td>No</td>
          <td>An object of custom event handlers so that you can listen to any CKEditor event (Added in v1.0.6)</td>
        </tr>
    </tbody>
</table>

Note- Starting v1.0.6, you can listen to `change` event directly by passing its event handler in `events` prop instead of passing a separate onChange prop. The onChange prop is now deprecated.

## License

`react-ckeditor-component` is released under the `MIT license`.
