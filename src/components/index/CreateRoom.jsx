import React from 'react';

export default function CreateRoom() {
  return (
    <div className="center-window flex-center">
      <div className="container-login flex-center">
        <div className="wrap-login">
          <div>Brainstorm!</div>
          <div>[Logo]</div>
          <div>
            <form action="start">
              <button>Create New Brainstorm!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
