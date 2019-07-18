import React, { Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import CardContent from './CardContent';

const CardsContainer = ({ content }) => (
  <Fragment>
    <Grid relaxed>
      <Grid.Row>
        <Grid centered>
          {content.map(c => (
            <Grid.Column width={7}>
              <CardContent
                key={`${c.title}-${c.idcontent}`}
                link={c.link}
                tags={c.tagsNames}
                color={c.color}
                id={c.idcontent}
                title={c.title}
              />
            </Grid.Column>
          ))}
        </Grid>
      </Grid.Row>
    </Grid>


  </Fragment>
);
export default CardsContainer;
