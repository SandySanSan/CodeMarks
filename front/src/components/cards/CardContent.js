
import React from 'react';
import ReactTinyLink from 'react-tiny-link';
import { Link } from 'react-router-dom';
import {
  Card, Button
  // Label
} from 'semantic-ui-react';

const CardContent = ({ link, id, title }) => (
  <div>
    <Card
      fluid
      style={{ marginBottom: '5px' }}
    >
      <Card.Content>
        <ReactTinyLink
          cardSize="small"
          showGraphic
          maxLine={2}
          minLine={1}
          url={link}
        />
      </Card.Content>
      <Card.Content extra>
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
      </Card.Content>
    </Card>
  </div>

);

export default CardContent;
