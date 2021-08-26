export const profileFeed = () => {
  const rootMain = document.querySelector('.root');

  const profileContainer = document.createElement('main');
  profileContainer.classList.add('profile-feed');
  profileContainer.innerHTML = `
<div class='userprofile'>
    
</div>
`;
  rootMain.appendChild(profileContainer);
  return rootMain;
};
