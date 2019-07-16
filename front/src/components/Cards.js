
import React from 'react';
import ReactTinyLink from 'react-tiny-link';
import { Card, Icon } from 'semantic-ui-react';

const Cards = () => (

  <Card>
    <Card.Content>
      <ReactTinyLink
        cardSize="small"
        showGraphic
        maxLine={2}
        minLine={1}
        url="https://medium.com/better-programming/role-based-authorization-in-react-c70bb7641db4"
      />
    </Card.Content>
    <Card.Content extra>
      <Icon name="user" />
      4 Friends
    </Card.Content>
  </Card>
);

export default Cards;
