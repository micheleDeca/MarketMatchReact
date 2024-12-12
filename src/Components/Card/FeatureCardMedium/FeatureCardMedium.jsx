import React from 'react';
import './FeatureCardMedium.css';

const FeatureCardMedium = () => {
  return (
    <div className="card-medium">
      <div className="card-img-holder">
        <img
          src="https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
         />
      </div>
      <h3 className="blog-title">Learn Microinteraction</h3>
      {false && <span className="blog-time">Monday Jan 20, 2020</span>} 
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis viverra turpis, non cursus ex accumsan at.
      </p>
      <div className="options">
        <span className="read-more">Read Full Blog</span>
        <button className="btn">Blog</button>
      </div>
      
    </div>

    
  );
};

export default FeatureCardMedium;
