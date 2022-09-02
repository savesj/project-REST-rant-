const router = require('express').Router()
const db = require('../models')

router.get("/", (_req, res)=> {
      db.Place.find()
        .then((places) => {
            res.render('places/index', { places })
        })
        .catch(err => {
            console.log(err)
            res.render('error404')
        })
})


router.post('/', (req, res) => {
  db.Place.create(req.body)
  .then(() => {
      res.redirect('/places')
  })
  .catch((err) => {
       if (err && err.name == "ValidationError") {
        let message = "Validation Error: ";
        for (var field in err.errors) {
          message += `${field} was ${err.errors[field].value}. `;
          message += `${err.errors[field].message}`;
        }
        console.log("Validation error message", message);
        res.render("places/new", { message });
      } else {
        res.render("error404");
      }
    });
});

router.get("/new", (_req, res) => {
  res.render("places/new");
});

router.get('/:id', (req, res) => {
    db.Place.findById(req.params.id)
    .populate('comments')
    .then((place) => {
        console.log(place.comments)
        res.render('places/show', { place })
    })
    .catch((err) => {
        console.log('err', err)
        res.render('error404')
    })
})

router.put('/:id', (req, res) => {
    db.Place.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/places/${req.params.id}`)
    })
    .catch((err) => {
        console.log('err', err)
        res.render('error404')
    })
})

router.delete('/:id', (req, res) => {
    db.Place.findByIdAndDelete(req.params.id)
        .then((_place) => {
            res.redirect('/places')
        })
        .catch((err) => {
            console.log('err', err)
            res.render('error404')
        })
})

router.get('/:id/edit', (req, res) => {
    db.Place.findById(req.params.id)
        .then((place) => {
            res.render('places/edit', { place })
        })
        .catch((_err) => {
            res.render('error404')
        })
})

router.post("/:id/rant", (_req, res) => {
  res.send("GET /places/:id/rant stub");
});

router.post("/:id/comment", (req, res) => {
  if (req.body.rant) {
    req.body.rant = true;
  } else {
    req.body.rant = false;
  }
  db.Place.findById(req.params.id)
    .then((place) => {
      console.log(db.Comment);
      db.Comment.create(req.body)
        .then((comment) => {
          place.comments.push(comment.id);
          place.save().then(() => {
            res.redirect(`/places/${req.params.id}`);
          });
        })
        .catch((err) => {
          console.log(err);
          res.render("error404");
        });
    })
    .catch((_err) => {
      res.render("error404");
    });
});

router.delete("/:id/rant/:rantId", (_req, res) => {
  res.send("GET /places/:id/rant/:rantId stub");
});

router.delete("/:id/comment/:commentId", (req, res) => {
  db.Place.findOne({ id: req.params.id })
    .then((_place) => {
      db.Comment.findByIdAndDelete(req.params.commentId).then((_place) => {
        res.redirect(`/places/${req.params.id}`);
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});
module.exports = router
