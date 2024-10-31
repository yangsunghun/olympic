import React from "react";

const MedalList = ({ medalInfo, setMedalInfo }) => {
  const handleDelete = (index) => {
    const updatedMedalInfo = medalInfo.filter((_, i) => i !== index);
    setMedalInfo(updatedMedalInfo);
    localStorage.setItem("medalInfo", JSON.stringify(updatedMedalInfo));
  };

  if (!Array.isArray(medalInfo)) {
    return <div></div>;
  }

  // 금메달 개수에 따라 오름차순 정렬
  const sortedMedalInfo = [...medalInfo].sort((a, b) => b.gold - a.gold);

  return (
    <table className="medal_table">
      <thead>
        <tr>
          <th>국가명</th>
          <th>금메달</th>
          <th>은메달</th>
          <th>동메달</th>
          <th>액션</th>
        </tr>
      </thead>
      <MedalListItem medalInfo={sortedMedalInfo} handleDelete={handleDelete} />
    </table>
  );
};

const MedalListItem = ({ medalInfo, handleDelete }) => {
  if (!medalInfo || medalInfo.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="5">등록된 국가가 없습니다.</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {medalInfo.map((item, index) => (
        <tr key={index}>
          <td>{item.country}</td>
          <td>{item.gold}</td>
          <td>{item.silver}</td>
          <td>{item.bronze}</td>
          <td>
            <button onClick={() => handleDelete(index)}>
              <span>삭제</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default MedalList;
