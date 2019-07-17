
import React from 'react';
import ReactTinyLink from 'react-tiny-link';
import {
  Card, Icon, Grid, Label
} from 'semantic-ui-react';

const CardContent = ({ link, tags, color }) => (
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
        {tags.map(tag => (
          <Label size="mini" color={color} key={`${tag}-${color}`}>
            {tag}
          </Label>
        ))}
      </Card.Content>
      <Card.Content extra>
        <Grid>
          <Grid.Column width={6}>
            <Icon name="write" />
            Rédiger une note
          </Grid.Column>
          <Grid.Column width={6}>
            <Icon name="delete" />
            Supprimer
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  </div>

);

export default CardContent;
