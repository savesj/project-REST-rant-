const React = require('react')
const Def = require('../default')

function show (data) {
    return (
        <Def>
          <main>
            <h1>{ data.place.name }</h1>
            <div>
            <h2>Rating</h2>
            </div>
            <div>
            <h2>Not Rated</h2>
            </div>
            <div>
            <h2>Description</h2>
            </div>
            <div><h2>Located in Seattle, WA and serving Thai, Pan-Asian</h2></div>
            <div><h2>Comments</h2></div>
            <div><h2>No Comments yet!</h2></div>
            <div>
                <a href={`/places/${data.id}/edit`} className="btn btn-warning"> 
                Edit
                </a>     
                <form method="POST" action={`/places/${data.id}?_method=DELETE`}> 
                    <button type="submit" className="btn btn-danger">
                Delete
                    </button>
                </form>     

            </div>
          </main>
        </Def>
    )
}

module.exports = show
