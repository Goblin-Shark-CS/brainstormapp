import React from 'react';

export default function Login() {
  return (
    <div className="center-window flex-center">
      <div className="container-login flex-center">
        <div className="wrap-login">
          <div>Brainstorm!</div>
          <div>[Logo]</div>
          <div>
            <form action="addroom">
              <button>Create New Brainstorm!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
