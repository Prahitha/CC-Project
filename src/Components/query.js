import React, { useState } from 'react';
import Amplify, { Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const downloadUrl = async () => {
    // Creates download url that expires in 5 minutes/ 300 seconds
    const downloadUrl = await Storage.get('picture.jpg', { expires: 300 });
    window.location.href = downloadUrl
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      // Upload the file to s3 with private access level. 
      await Storage.put('picture.jpg', file, {
        level: 'public',
        contentType: 'image/jpg'
      });
      // Retrieve the uploaded file to display
      const url = await Storage.get('picture.jpg', { level: 'public' })
      setImageUrl(url);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <h1> Upload an Image </h1>
      {loading ? <h3>Uploading...</h3> : <input
        type="file" accept='image/jpg'
        onChange={(evt) => handleChange(evt)}
      />}
      <div>
        {imageUrl ? <img style={{ width: "30rem" }} src={imageUrl} /> : <span />}
      </div>
      <div>
        <h2>Download URL?</h2>
        <button onClick={() => downloadUrl()}>Click Here!</button>
      </div>
    </div>
  );
}

// withAuthenticator wraps your App with a Login component
export default withAuthenticator(App);