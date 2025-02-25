import React, { useState } from "react";
import "../css/ApiTable.css"

const JsonTable = ({ data }) => {
  if (typeof data !== "object" || data === null) {
    return <td>{String(data)}</td>; // value'yu yazdırıyoruz
  }

  if (Array.isArray(data)) { // array ise yeni bir tablo olusturuyoz
    return (
      <td>
        <table border="1">
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <JsonTable data={item} />
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    );
  }

  return (
    <td>
      <table border="1">
        <tbody>
          {Object.entries(data).map(([key, value]) => ( // object'i >> array'e ceviriyoz
            <tr key={key}>
              <th>{key.toUpperCase()}</th>
              <JsonTable data={value} />
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  );
};



const ApiTable = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [jsonVeri, setjsonVeri] = useState(null);
  const [error, setError] = useState(null);

  const jsonGetir = async () => {
    try {
      setError(null);
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("api isteği başarısız oldu");
      const data = await response.json();
      setjsonVeri(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fulltablo">
      <div className="ust">
        <input
          className="input"
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="API URL'sini girin"
        />
        <button className="button" onClick={jsonGetir}>JSON Verisini Getir</button>

      </div>

      <div className="tablo">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {jsonVeri && (
          <table border="1">
            <tbody>
              <JsonTable data={jsonVeri} />
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default ApiTable;
