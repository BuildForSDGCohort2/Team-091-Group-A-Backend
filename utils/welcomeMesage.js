const welcomeMessage = (user) => `
<div>
  <div style="text-align:center;">
    <img src="https://res.cloudinary.com/kayode/image/upload/v1601218786/Capture_lfjxvi.png" alt="Logo" width="50px" height="50px"/>
  </div>
  <h1>Hi ${user.firstname} ${user.lastname} </h1>
  <p>We are welcome To see you at Transall. The home of transportation and hospitality</p>
  <p>At Transall, we seek to provide you with relevant travelling information 
  in order for you to make adequate information before making relevant decisions.
  </p>
  <div>
    <h5>Here are the details of your account</h5>
    <p>Name: ${user.firstname} ${user.lastname}</p>
    <p>Email: ${user.email}</p>
  </div>
  </div>
`;

module.exports = welcomeMessage;