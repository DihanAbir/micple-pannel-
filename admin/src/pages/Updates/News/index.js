import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  ButtonBase,
} from "@material-ui/core";
import { Edit, Delete, Add, Link } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { adminHeader } from "../../../shared/functions/Token";
import { HoverOver } from "../../../components/Tools";
import { getUrl } from "../../../shared/functions";
import { When } from "../../../components";
import { addImage } from "../style";

export default () => {
  const classes = addImage();
  const [updates, setUpdates] = useState([]);
  const [working, setWorking] = useState(true);
  const [adding, setAdding] = useState(false);
  const [add, setAdd] = useState(false);
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [edit, setEdit] = useState(null);
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);
  let adImageInput = useRef();
  let itemLink = useRef();
  useEffect(() => {
    setWorking(true);
    axios
      .get(`${BACKEND_URL}/sponsors/home/top`, { headers: adminHeader() })
      .then(({ data }) => {
        setUpdates(data);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }, []);
  function close() {
    setAdding(false);
    setAdd(false);
    setLink("");
    setEdit(null);
  }
  function onEdit(id) {
    const e = updates.find((i) => i.id === id);
    if (e) {
      setEdit(e);
      setAdd(true);
      setLink(e.link);
    }
  }
  function saveNews() {
    setAdding(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("link", link.trim());
    formData.append("date", new Date().toISOString());
    axios
      .post(`${BACKEND_URL}/sponsors/home/top`, formData, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        setUpdates([data, ...updates]);
        close();
      })
      .catch((err) => {
        setAdding(false);
        throw err;
      });
  }
  function editNews() {
    if (!edit) {
      return;
    }
    setAdding(true);
    const formData = new FormData();
    if (!!image) {
      formData.append("image", image);
    }
    formData.append("link", link.trim());
    formData.append("date", new Date().toISOString());
    axios
      .put(`${BACKEND_URL}/sponsors/home/${edit.id}`, formData, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        setUpdates(
          updates.map((i) => {
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
  function deleteNews() {
    setDeleting(true);
    axios
      .delete(`${BACKEND_URL}/sponsors/home/${deleteId}`, {
        headers: adminHeader(),
      })
      .then(() => {
        setUpdates([...updates.filter((i) => i.id !== deleteId)]);
        setDeleting(false);
        setDeleteId(null);
      })
      .catch((err) => {
        setDeleting(false);
        setDeleteId(null);
        throw err;
      });
  }
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        margin: 20,
        overflowX: "auto",
        alignItems: "center",
      }}
    >
      <ButtonBase
        style={{
          width: 100,
          backgroundColor: "#0003",
          borderRadius: 10,
          flex: "none",
          height: "100%",
        }}
        onClick={() => setAdd(true)}
      >
        <Add
          style={{
            fontSize: 40,
            color: "#666",
            backgroundColor: "#e7e7e7",
            borderRadius: "50%",
          }}
        />
      </ButtonBase>
      <div style={{ display: "flex" }}>
        {working
          ? [0, 1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                style={{
                  marginLeft: 20,
                  borderRadius: 10,
                  backgroundColor: "#0004",
                }}
                variant="rect"
                width={200}
                height="auto"
              />
            ))
          : updates.map((item) => (
              <div
                style={{
                  marginLeft: 20,
                  borderRadius: 10,
                  backgroundColor: "#0004",
                  width: 200,
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
                key={item.id}
              >
                <HoverOver title={item.link} placement="bottom">
                  <img
                    style={{ width: "100%", height: "auto", maxHeight: 100 }}
                    src={getUrl(item.image)}
                    alt=""
                  />
                </HoverOver>
                <input
                  type="text"
                  className="fileInput"
                  defaultValue={item.link}
                  ref={(ref) => (itemLink = ref)}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <When date={item.date} />
                  <IconButton
                    color="primary"
                    onClick={() => {
                      itemLink.select();
                      document.execCommand("copy");
                    }}
                  >
                    <Link />
                  </IconButton>
                  <IconButton color="primary" onClick={() => onEdit(item.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => setDeleteId(item.id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))}
      </div>

      <Dialog open={add} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle>Daily Updates</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
            label="Set Link"
            margin="normal"
          />
          {!edit ? (
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div>Width: 980px</div>
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
              <div>Height: 200px</div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div>Width: 980px</div>
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
              <div>Height: 200px</div>
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
              onClick={editNews}
              color="primary"
              variant="contained"
              disabled={adding || !link}
            >
              Edit
            </Button>
          ) : (
            <Button
              size="small"
              autoFocus
              onClick={saveNews}
              color="primary"
              variant="contained"
              disabled={adding || !link || !image}
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
        <DialogTitle>Delete Update</DialogTitle>
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
            onClick={deleteNews}
            color="secondary"
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
