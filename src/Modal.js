const Modal = ({
  limit,
  dataCount,
  setLimit,
  setDataCount,
  handleSubmitDataResource,
}) => (
  <div
    className="modal fade"
    id="dataModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="dataModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="dataModalLabel">
            Set Sample Data
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="limit">Limit</label>
            <input
              type="text"
              className="form-control"
              id="limit"
              value={limit}
              aria-describedby="limit"
              placeholder="limit"
              onChange={({ target }) => setLimit(target.value)}
            />
            <small id="limit" className="form-text text-muted">
              Data Limit
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="dataCount">Data Count</label>
            <input
              type="text"
              className="form-control"
              id="dataCount"
              value={dataCount}
              aria-describedby="Data Count"
              placeholder="Data Count"
              onChange={({ target }) => setDataCount(target.value)}
            />
            <small id="dataCount" className="form-text text-muted">
              Data Count
            </small>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={handleSubmitDataResource}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
