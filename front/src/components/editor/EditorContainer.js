import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Container, Grid, Button as ButtonSem } from 'semantic-ui-react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Iframe from './iframe.js';
import { isKeyHotkey } from 'is-hotkey';
import { Button, Icon, Toolbar } from './components';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";
import "../../../node_modules/noty/lib/themes/metroui.css"



const DEFAULT_NODE = 'paragraph'

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')


const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'Rédige ta note ici :-)',
          },
        ],
      },
    ],
  },
});


class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      id: this.props.match.params.id,
      note: '',
      value: initialValue
    };
  }

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  ref = editor => {
    this.editor = editor
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  submitNote = () => {
    const { value, id } = this.state;
    const note = JSON.stringify(value.toJSON())

    axios.put(`/api/content/add-note/${id}`, { note })
    new Noty({
      text: "CONFIRMATION La note a été correctement enregistrée!",
      theme: "metroui",
      type: "success",
      layout: 'topCenter',
      timeout: '2000',
    }).show();

    const { history } = this.props;

    setTimeout(function () {
      history.push('/');
    }, 1000);

  }

  componentDidMount() {
    // const { id } = this.props.history.location.id;
    const { id } = this.state;

    axios.get(`/api/content/${id}`)
      .then(resp => this.setState({
        idcontent: resp.data[0].idcontent,
        title: resp.data[0].title,
        link: resp.data[0].link,
        note: resp.data[0].note
      }));
  }

  render() {

    const { value, link, id } = this.state;
    console.log(id)
    return (
      <Fragment>
        <Container fluid style={{ padding: '25px' }}>
          <Grid>
            <Grid.Column width={7}>
              <div style={{ paddingBottom: '25px' }}><ButtonSem onClick={this.submitNote}>Enregistrer la note</ButtonSem></div>
              <div style={{ height: '620px' }}>
                <Toolbar>
                  {this.renderMarkButton('bold', 'format_bold')}
                  {this.renderMarkButton('italic', 'format_italic')}
                  {this.renderMarkButton('underlined', 'format_underlined')}
                  {this.renderMarkButton('code', 'code')}
                  {this.renderBlockButton('heading-one', 'looks_one')}
                  {this.renderBlockButton('heading-two', 'looks_two')}
                  {this.renderBlockButton('block-quote', 'format_quote')}
                  {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                  {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
                </Toolbar>
                <Editor
                  spellCheck
                  autoFocus
                  placeholder="Enter some rich text..."
                  value={value}
                  ref={this.ref}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  renderBlock={this.renderBlock}
                  renderMark={this.renderMark}

                />
              </div>
            </Grid.Column>
            <Grid.Column width={9}>
              <Iframe
                url={link}
                width="100%"
                height="100%"
                scrolling
                display="initial"
                position="relative"
              />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment >
    );
  }
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  onKeyDown = (event, editor, next) => {
    const { value } = editor
    const { startBlock } = value

    if (event.key === 'Enter' && startBlock.type === 'code') {
      editor.insertText('\n')
      return
    }

    next()
  }


  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.state

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }
}

export default withRouter(EditorContainer);
