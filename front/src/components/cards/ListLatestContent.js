import React, { Fragment } from 'react';
import { List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ListLatestContent = ({ id, link, title, type, dateCreation }) => (
  <Fragment>
    <List.Item>
      <List.Content floated="right">
        <Button.Group basic size="small">
          <Link to={{
            pathname: '/editor',
            id: { id },
            title: { title },
            link: { link }

          }}
          >
            <Button icon="write" />
          </Link>
          <Button icon="eye" />
          <Button icon="delete" />
        </Button.Group>
      </List.Content>
      <List.Icon name={type === 'article' ? 'file text' : 'file video'} size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header as="a" href={link} target="_blank">{title}</List.Header>
        <List.Description as="a">Ajouté le {dateCreation}</List.Description>
      </List.Content>
    </List.Item>
  </Fragment>
);

export default ListLatestContent;
