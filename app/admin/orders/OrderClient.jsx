'use client';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

import Modal from '@/components/modal';

import classes from './OrderClient.module.css';

export default function OrderClient({ initialOrders }) {
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const filteredOrders = initialOrders.filter(order => {
    const term = search.toLowerCase();
    const orderDate = new Date(order.timestamp).toISOString().split('T')[0];

    const matchesSearch = (
      order.customer_info.name.toLowerCase().includes(term) ||
      order.customer_info.email.toLowerCase().includes(term) ||
      order.customer_info.phone.includes(term) ||
      order.customer_info.address.toLowerCase().includes(term)
    );

    const matchesDate =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);

    return matchesSearch && matchesDate;
  });

  function handleOrderSelection(order) {
    setSelectedOrder(order);
    setIsOpen(true);
  }

  function handleModalClose() {
    setSelectedOrder('');
    setIsOpen(false);
  }

  function today() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <h1>הזמנות</h1>

      <form className={classes['order-search-form']}>

        <div className={`${classes['input-group']} ${classes['search']}`}>
          <label>חיפוש</label>
          <input
            placeholder="שם/טלפון/כתובת"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={`${classes['input-group']} ${classes['start-date']}`}>
          <label>מתאריך</label>
          <input
            type="date"
            max={today()}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className={`${classes['input-group']} ${classes['end-date']}`}>
          <label>עד תאריך</label>
          <input
            type="date"
            max={today()}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

      </form>

      <table className={classes['orders-table']}>
        {filteredOrders.length === 1
          ? (
            <caption>מציג הזמנה אחת</caption>
          )
          : filteredOrders.length <= 0
            ? (
              <caption>אין הזמנות להצגה</caption>
            ) : (
              <caption>מציג <strong>{filteredOrders.length}</strong> הזמנות</caption>
            )
        }
        <thead>
          <tr>
            <th>מועד ביצוע</th>
            <th>שם</th>
            <th>טלפון</th>
            <th>כתובת</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr className={classes['order-row']} key={order.id} onClick={() => handleOrderSelection(order)}>
              <td>
                <span>מועד ביצוע:</span>
                <span>
                  {new Date(order.timestamp).toLocaleString('he-IL', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </span>
              </td>
              <td>
                <span>שם:</span>
                <span>{order.customer_info.name}</span>
              </td>
              <td>
                <span>טלפון:</span>
                <a href={`tel:${order.customer_info.phone}`}>{order.customer_info.phone}</a>
              </td>
              <td>
                <span>כתובת:</span>
                <span>{order.customer_info.address}</span>
              </td>
              <td>
                <ChevronLeft strokeWidth={3} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <Modal onClose={handleModalClose}>
          <p>
            {selectedOrder.customer_info.name}
            &nbsp;-&nbsp;
            {new Date(selectedOrder.timestamp).toLocaleString('he-IL', {
              dateStyle: 'short',
              timeStyle: 'short'
            })}
          </p>
          <div dangerouslySetInnerHTML={{ __html: selectedOrder.itemsTableHtml }} />
          {
            selectedOrder.comment &&
            <div className={classes['comment']}>
              <p>הערה:</p>
              <p className={classes['comment-body']}>
                {selectedOrder.comment}
              </p>
            </div>
          }
        </Modal>
      )}
      {filteredOrders.length === 0 && (
        <p style={{ textAlign: 'center', padding: '20px' }}>לא נמצאו הזמנות לטווח שנבחר.</p>
      )}
    </>
  );
}