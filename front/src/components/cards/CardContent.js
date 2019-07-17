
import React from 'react';
import ReactTinyLink from 'react-tiny-link';
import { Link } from 'react-router-dom';
import {
  Card, Button
  // Label
} from 'semantic-ui-react';

const CardContent = ({
  link, id
  // tags, color
}) => (
    <div>
      <Card
        fluid
        style={{ marginBottom: '20px' }}
      >
        <Card.Content>
          <ReactTinyLink
            cardSize="small"
            showGraphic
            maxLine={2}
            minLine={1}
            url={link}
          />
          {/* {tags.map(tag => (
          <Label size="mini" color={color} key={`${tag}-${color}`}>
            {tag}
          </Label>
        ))} */}
        </Card.Content>
        <Card.Content extra>
          <Button.Group basic size="small">
            <Link to={{
              pathname: '/editor',
              id: { id }
            }}
            >
              <Button
                icon="write"
              />
            </Link>
            <Button icon="eye" />
            <Button icon="delete" />

          </Button.Group>
        </Card.Content>
      </Card>
    </div>

  );

export default CardContent;
