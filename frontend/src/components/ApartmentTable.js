import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TOKEN } from "../config";
import { useApi } from "../api";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ApartmentTable({ list }) {
  const { id } = useParams();
  const [form, setForm] = useState(list);
  const [formError, setFormError] = useState([]);
  const headers = { Authorization: `Token ${TOKEN}` };

  const [{ data, loading, error }, updateList] = useApi(
    {
      url: `/api/v1/supplies/${id}/update_supply/`,
      method: "PATCH",
      headers
    },
    { manual: true }
  );

  useEffect(() => {
    if (error) {
      setFormError(error.response.data);
    }
  }, [form, error]);

  const handleSubmit = e => {
    e.preventDefault();
    setFormError([]);
    updateList({ data: form });
  };

  const handleUpdate = (id, obj) => {
    const index = form.findIndex(item => item.id === id);
    if (index >= 0) {
      form[index] = {
        ...form[index],
        ...obj
      };
      setForm([...form]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Category</th>
            <th>In Use</th>
            <th>Stock</th>
            <th>Standard</th>
          </tr>
        </thead>
        <tbody>
          {form.map((item, key) => (
            <tr key={item.id}>
              <td>{item.supply.name}</td>
              <td>{item.supply.description}</td>
              <td>{item.supply.brand}</td>
              <td>{item.supply.category}</td>
              <td>
                <Form.Control
                  value={item.in_use || ""}
                  onChange={e =>
                    handleUpdate(item.id, { in_use: e.target.value })
                  }
                  size="sm"
                  required={false}
                  type="number"
                  width="3rem"
                  isInvalid={formError[key] && formError[key].in_use}
                  placeholder="Enter In Use"
                />
                {formError[key] && formError[key].in_use && (
                  <Form.Control.Feedback type="invalid">
                    {formError[key].in_use}
                  </Form.Control.Feedback>
                )}
              </td>
              <td>
                <Form.Control
                  value={item.stock || ""}
                  onChange={e =>
                    handleUpdate(item.id, { stock: e.target.value })
                  }
                  size="sm"
                  isInvalid={formError[key] && formError[key].stock}
                  required={true}
                  type="number"
                  width="3rem"
                  placeholder="Enter Stock"
                />
                {formError[key] && formError[key].stock && (
                  <Form.Control.Feedback type="invalid">
                    {formError[key].stock}
                  </Form.Control.Feedback>
                )}
              </td>
              <td>{item.standard}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" disabled={loading} type="submit">
        {loading ? "Saving…" : "Save"}
      </Button>
      {data && <span className="ml-4 alert alert-success">{data.message}</span>}
    </Form>
  );
}

export default ApartmentTable;
