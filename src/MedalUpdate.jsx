import React, { useState } from "react";
import MedalList from "./MedalList";

const MedalUpdate = () => {
  const [inputValues, setInputValues] = useState({
    country: "",
    gold: 0,
    silver: 0,
    bronze: 0,
  });

  const [medalInfo, setMedalInfo] = useState(() => {
    const storedMedalInfo = localStorage.getItem("medalInfo");
    return storedMedalInfo ? JSON.parse(storedMedalInfo) : [];
  });

  const inputGroups = [
    { itemTitle: "국가명", inputType: "text", inputKey: "country" },
    { itemTitle: "금메달", inputType: "number", inputKey: "gold" },
    { itemTitle: "은메달", inputType: "number", inputKey: "silver" },
    { itemTitle: "동메달", inputType: "number", inputKey: "bronze" },
  ];

  const handleChange = (key, value) => {
    const newValue = key !== "country" ? parseInt(value, 10) : value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingIndex = medalInfo.findIndex(
      (item) => item.country === inputValues.country
    );

    if (existingIndex !== -1) {
      alert("이미 존재하는 국가입니다. 업로드가 불가능합니다.");
      return;
    }

    if (inputValues.country === "") {
      alert("국가를 입력해주세요");
      return;
    }

    const updatedData = [...medalInfo, inputValues];
    localStorage.setItem("medalInfo", JSON.stringify(updatedData));
    setMedalInfo(updatedData);

    setInputValues({
      country: "",
      gold: 0,
      silver: 0,
      bronze: 0,
    });

    alert("정보가 저장되었습니다!");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const existingIndex = medalInfo.findIndex(
      (item) => item.country === inputValues.country
    );

    if (existingIndex === -1) {
      alert("업데이트할 국가가 존재하지 않습니다.");
      return;
    }

    const updatedMedalInfo = [...medalInfo];
    updatedMedalInfo[existingIndex] = {
      country: inputValues.country,
      gold: inputValues.gold,
      silver: inputValues.silver,
      bronze: inputValues.bronze,
    };

    setMedalInfo(updatedMedalInfo);
    localStorage.setItem("medalInfo", JSON.stringify(updatedMedalInfo));
    alert("정보가 업데이트되었습니다!");

    setInputValues({
      country: "",
      gold: 0,
      silver: 0,
      bronze: 0,
    });
  };

  return (
    <div>
      <form>
        <ul className="medal_update">
          {inputGroups.map((item) => (
            <MedalUpdateItem
              key={item.inputKey}
              itemTitle={item.itemTitle}
              inputType={item.inputType}
              inputValue={inputValues[item.inputKey]}
              onChange={(e) => handleChange(item.inputKey, e.target.value)}
            />
          ))}
          <li>
            <button type="submit" onClick={handleSubmit}>
              국가 추가
            </button>
            <button type="button" onClick={handleUpdate}>
              업데이트
            </button>
          </li>
        </ul>
      </form>
      <MedalList medalInfo={medalInfo} setMedalInfo={setMedalInfo} />
    </div>
  );
};

const MedalUpdateItem = ({ itemTitle, inputType, inputValue, onChange }) => {
  return (
    <li>
      <p>{itemTitle}</p>
      <input type={inputType} value={inputValue} onChange={onChange} />
    </li>
  );
};

export default MedalUpdate;
