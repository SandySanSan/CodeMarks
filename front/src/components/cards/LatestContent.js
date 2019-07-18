import React from 'react';
import { List } from 'semantic-ui-react';
import ListLatestContent from './ListLatestContent';


const LatestContent = ({ content }) => {
  const newestContent = content.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));
  const lastest = newestContent.splice(0, 4);

  return (

    <List divided relaxed>
      {lastest.map(el => (
        <ListLatestContent
          type={el.type}
          title={el.title}
          id={el.id}
          link={el.link}
          dateCreation={el.dateCreation}
        />
      ))}
    </List>
  );
};

export default LatestContent;
