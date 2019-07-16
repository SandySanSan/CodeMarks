
import React from 'react';
import ReactTinyLink from 'react-tiny-link';
import { Card, Icon } from 'semantic-ui-react';

const CardContent = ({ link }) => (
  <div>
    <Card fluid>
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
        <Icon name="write" />
        Rédiger une note
      </Card.Content>
    </Card>
  </div>

);

export default CardContent;
