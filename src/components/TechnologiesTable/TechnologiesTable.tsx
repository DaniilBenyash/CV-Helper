import { FC } from "react";
import { TechnologiesTableData } from "@/abstraction/store/fields";
import { convertMonthsToYears } from "@/utils/convertMonthsToYears";

type Props = {
  tableObj: TechnologiesTableData;
};

// TODO should make the component as AntDesign Table
export const TechnologiesTable: FC<Props> = ({ tableObj }) => {
  const sections = Object.keys(tableObj);
  return (
    <table style={{ height: "min-content", width: "100%" }}>
      {sections.map((section) => (
        <tr>
          <td
            style={{
              color: "#c63031",
              textAlign: "left",
              borderTop: "3px solid #c63031",
              borderBottom: "2px solid #cccccc",
              padding: "14px 20px",
              borderLeft: "1px solid white",
              borderRight: "1px solid white",
              width: "15%",
            }}
          >
            {section}
          </td>
          <td
            style={{
              borderTop: "3px solid #c63031",
              borderBottom: "2px solid #cccccc",
              borderLeft: "1px solid white",
              borderRight: "1px solid white",
              paddingBottom: "13px",
              width: "50%",
            }}
          >
            {tableObj[section].map((item) => (
              <p style={{ margin: "14px 20px", color: "#353535" }}>{item.name}</p>
            ))}
          </td>
          <td
            style={{
              borderTop: "3px solid #c63031",
              borderBottom: "2px solid #cccccc",
              borderLeft: "1px solid white",
              borderRight: "1px solid white",
              paddingBottom: "13px",
            }}
          >
            {tableObj[section].map((item) => (
              <p
                style={{
                  margin: "14px 20px",
                  color: "#353535",
                  textAlign: "center",
                }}
              >
                {convertMonthsToYears(item.range)}
              </p>
            ))}
          </td>
          <td
            style={{
              borderTop: "3px solid #c63031",
              borderBottom: "2px solid #cccccc",
              borderLeft: "1px solid white",
              borderRight: "1px solid white",
              paddingBottom: "13px",
            }}
          >
            {tableObj[section].map((item) => (
              <p
                style={{
                  margin: "14px 20px",
                  color: "#353535",
                  textAlign: "center",
                }}
              >
                {item.lastUsed}
              </p>
            ))}
          </td>
        </tr>
      ))}
    </table>
  );
};
