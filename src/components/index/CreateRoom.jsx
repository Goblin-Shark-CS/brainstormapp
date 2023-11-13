import React from 'react';

export default function CreateRoom() {
  return (
    <div className="center-window flex-center">
      <div className="container-login flex-center">
        <div className="wrap-login">
          <div className = "main-name" > IdeaStation </div>
          <div classnName = "logo"><img src='/assets/brainstorming.png' alt="IdeaStation"  height = {'25%'}/> </div>
          <div>
            <form action="start">
              <button className="button">Create Room </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}