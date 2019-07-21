
import React from 'react';
import { withRouter } from "react-router-dom";

import ReactTinyLink from 'react-tiny-link';
import { Link } from 'react-router-dom';
import {
  Card, Button
} from 'semantic-ui-react';

const CardContent = ({ link, id, title, note }) => (
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
            pathname: `/editor/${id}`,
          }}
          >
            <Button icon="write" />
          </Link>
          {note !== null ? (
            <Link to={{
              pathname: `/display-note/${id}`,
            }}
            >
              <Button icon="eye" />
            </Link>
          ) : ''}
          <Button icon="delete" />
        </Button.Group>
      </Card.Content>
    </Card>
  </div>

);

export default withRouter(CardContent);
