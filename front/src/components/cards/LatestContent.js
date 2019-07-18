import React, { Fragment } from 'react';
import { List } from 'semantic-ui-react';
import ListLatestContent from './ListLatestContent';


const LatestContent = ({ content }) => {
  const newestContent = content.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));
  const lastest = newestContent.splice(0, 3);

  return (
    <Fragment>
      <List divided relaxed>
        {lastest.map(el => (
          <ListLatestContent
            key={`${el.idcontent}-${el.dateCreation}`}
            type={el.type}
            title={el.title}
            id={el.idcontent}
            link={el.link}
            dateCreation={el.dateCreation}
          />
        ))}
      </List>
    </Fragment>
  );
};

export default LatestContent;
