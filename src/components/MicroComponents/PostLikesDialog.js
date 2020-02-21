import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const defaultPhoto =
        'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'

    return (
        <div className="likes-dialog">
            <Button color="primary" onClick={handleClickOpen}>
                {props.posts.length > 0 ? `${props.posts.length} Likes` : null}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {'Who liked the post'}
                    <hr
                        style={{
                            borderTop: '3px solid rgba(155, 155, 155, 0.4)',
                        }}
                    />
                </DialogTitle>
                <div style={{ width: '20rem' }}>
                    {props.posts.length > 0
                        ? props.posts.map(post => {
                              return (
                                  <div
                                      className="post-like-main-wrapper"
                                      key={post.data.postID}
                                  >
                                      <div
                                          style={{
                                              display: 'flex',
                                              height: '3rem',
                                              width: '5rem',
                                              marginLeft: '3.5rem',
                                              marginBottom: '1rem',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                          }}
                                      >
                                          <div className="post-like-avatar">
                                              <img
                                                  src={
                                                      post.data.photoURL
                                                          ? post.data.photoURL
                                                          : defaultPhoto
                                                  }
                                                  alt="avatar"
                                              />
                                          </div>
                                          <div style={{ width: '6rem' }}>
                                              <p
                                                  style={{
                                                      fontFamily: 'Lato',
                                                      fontSize: '19px',
                                                      width: '12rem',
                                                      marginLeft: '1rem',
                                                  }}
                                              >
                                                  {post.data.whoLiked}
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              )
                          })
                        : null}
                </div>
            </Dialog>
        </div>
    )
}
