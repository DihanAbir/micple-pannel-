import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  ButtonBase,
} from "@material-ui/core";
import { Edit, Delete, Add } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { adminHeader } from "../../../shared/functions/Token";
import { HoverOver } from "../../../components/Tools";
import { getUrl } from "../../../shared/functions";
import { When } from "../../../components";
import { addImage } from "../style";

export default ({ page }) => {
  const classes = addImage();
  const [items, setItems] = useState([]);
  const [working, setWorking] = useState(true);
  const [adding, setAdding] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(null);
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);
  let adImageInput = useRef();
  useEffect(() => {
    setWorking(true);
    axios
      .get(`${BACKEND_URL}/sponsors/home/${page}`, { headers: adminHeader() })
      .then(({ data }) => {
        setItems(data);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
    // eslint-disable-next-line
  }, []);
  function close() {
    setAdding(false);
    setAdd(false);
    setLink("");
    setTitle("");
    setImage(null);
    setEdit(null);
  }
  function onEdit(id) {
    const e = items.find((i) => i.id === id);
    if (e) {
      setEdit(e);
      setAdd(true);
      setLink(e.link);
      setTitle(e.title);
    }
  }
  function saveAd() {
    setAdding(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("link", link.trim());
    formData.append("title", title.trim());
    formData.append("date", new Date().toISOString());
    // const formData = {
    //   image: image,
    //   link: link.trim(),
    //   title: title.trim(),
    //   date: new Date().toISOString(),
    // };

    // console.log(`formData`, formData.image);
    axios
      .post(`${BACKEND_URL}/sponsors/home/${page}`, formData, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        setItems([data, ...items]);
        // console.log(`Items`, data);
        close();
      })
      .catch((err) => {
        setAdding(false);
        throw err;
        // console.log(`Items`, err);
      });
  }
  function editAd() {
    if (!edit) {
      return;
    }
    setAdding(true);
    const formData = new FormData();
    if (!!image) {
      formData.append("image", image);
    }
    formData.append("link", link.trim());
    formData.append("title", title.trim());
    formData.append("date", new Date().toISOString());
    axios
      .put(`${BACKEND_URL}/sponsors/home/${edit.id}`, formData, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        setItems(
          items.map((i) => {
            if (i.id === edit.id) {
              i = {
                ...i,
                ...data,
              };
            }
            return i;
          })
        );
        close();
      })
      .catch((err) => {
        setAdding(false);
        throw err;
      });
  }
  function deleteAd() {
    if (!deleteId) {
      return;
    }
    setDeleting(true);
    axios
      .delete(`${BACKEND_URL}/sponsors/home/${deleteId}`, {
        headers: adminHeader(),
      })
      .then(() => {
        setItems([...items.filter((i) => i.id !== deleteId)]);
        setDeleteId(null);
        setDeleting(false);
      })
      .catch((err) => {
        setDeleting(false);
        throw err;
      });
  }
  return (
    <div style={{ flex: 1, margin: 20 }}>
      {items.length < 5 && (
        <ButtonBase
          style={{
            backgroundColor: "#0003",
            borderRadius: 10,
            height: 50,
            width: "100%",
          }}
          onClick={() => setAdd(true)}
        >
          <Add
            style={{
              fontSize: 30,
              color: "#666",
              backgroundColor: "#e7e7e7",
              borderRadius: "50%",
            }}
          />
        </ButtonBase>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {working
          ? [0, 1, 2].map((i) => (
              <Skeleton
                key={i}
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: "#0004",
                }}
                variant="rect"
                width="auto"
                height={100}
              />
            ))
          : items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  marginTop: 10,
                  backgroundColor: "#0003",
                  borderRadius: 10,
                  height: 75,
                  overflow: "hidden",
                }}
              >
                <img
                  src={getUrl(item.image)}
                  alt=""
                  style={{ height: 75, width: 300 }}
                />
                <div
                  style={{
                    flex: "1 1 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <HoverOver title={item.title}>
                    <Typography
                      component="p"
                      style={{ fontSize: 15, margin: "0 5px" }}
                    >
                      {item.title?.substr(0, 25)}
                      {item.title?.length > 25 && "..."}
                    </Typography>
                  </HoverOver>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <small>
                      <When date={item.date} />
                    </small>
                    <div>
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(item.id)}
                      >
                        <Edit />
                      </IconButton>
                    </div>
                    <div>
                      <IconButton
                        color="secondary"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <Dialog open={add} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle>Home ${page} ad</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            value={title}
            error={title.length > 50}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            label="Set Title"
            margin="normal"
          />
          <TextField
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
            label="Set Link"
            margin="normal"
          />
          {!edit ? (
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div>Width: 300px</div>
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                onClick={() => adImageInput.click()}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${
                      !!image ? URL.createObjectURL(image) : null
                    })`,
                  }}
                />
                <span className={classes.imageBackdrop} />
              </ButtonBase>
              <div>Height: 75px</div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div>Width: 300px</div>
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                onClick={() => adImageInput.click()}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${
                      !!image ? URL.createObjectURL(image) : getUrl(edit.image)
                    })`,
                  }}
                />
                <span className={classes.imageBackdrop} />
              </ButtonBase>
              <div>Height: 75px</div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={close}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          {!!edit ? (
            <Button
              size="small"
              autoFocus
              onClick={editAd}
              color="primary"
              variant="contained"
              disabled={adding || !link || title.length > 50}
            >
              Edit
            </Button>
          ) : (
            <Button
              size="small"
              autoFocus
              onClick={saveAd}
              color="primary"
              variant="contained"
              disabled={adding || !link || !image || title.length > 50}
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete News</DialogTitle>
        <DialogContent dividers>Are you sure?</DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={() => setDeleteId(null)}
            color="secondary"
            variant="outlined"
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            size="small"
            autoFocus
            onClick={deleteAd}
            color="primary"
            variant="contained"
            disabled={deleting}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <input
        className="fileInput"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        type="file"
        ref={(ref) => (adImageInput = ref)}
      />
    </div>
  );
};
