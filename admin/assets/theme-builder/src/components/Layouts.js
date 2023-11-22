import React from 'react';
import Card from './Card';
import layoutItems from '../utils/layoutItems';

const Layouts = () => {

  return (
    <>
        <div className="ast-tb-canvas-content-row">
          {layoutItems.map((item, index) => (
            <Card key={index} title={item.label} icon={item.icon} layout={item.layout} template={item.template} />
          ))}
        </div>
    </>
  );
}

export default Layouts;
