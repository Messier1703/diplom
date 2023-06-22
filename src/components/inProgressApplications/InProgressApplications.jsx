import React from 'react';
import { Card, Button } from 'antd';

const InProgressApplications = ({ userApplications, completedApplications, handleUpdate, handleDelete, markAsCompleted, s }) => {
  return (
    <>
      {userApplications.map((item) => {
        if (item.status === 1 && !completedApplications.includes(item.id)) {
          return (
            <Card key={item.id}>
              <p>Описание: {item.description}</p>
              <p>Адрес: {item.adress}</p>
              <p>Номер телефона: {item.number}</p>
              {!completedApplications.includes(item.id) && (
                <Button id={s.btn} type="primary" onClick={() => handleUpdate(item.id)}>
                  Редактировать
                </Button>
              )}
              {!completedApplications.includes(item.id) && (
                <Button id={s.btn} type="primary" danger onClick={() => handleDelete(item.id)}>
                  Удалить
                </Button>
              )}
              {!completedApplications.includes(item.id) && (
                <Button id={s.btn} type="primary" onClick={() => markAsCompleted(item.id)}>
                  Завершить
                </Button>
              )}
            </Card>
          );
        }
        return null;
      })}
    </>
  );
};

export default InProgressApplications;
