import React from 'react'
import { Button, TablePagination, Divider, IconButton, Table, Typography, Container, Paper, Box, CircularProgress, TableRow, TableHead, TableContainer, TableCell, TableBody } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
function ListTickets({ rows, rowHeight, windowHeight, itemHeight, renderItem, ...props }) {
  const columns = Object.keys(rows[0]);
  const [tableHeight, setTableHeight] = React.useState(rowHeight * rows.length);
  const [scroll, setScroll] = React.useState({
    top: 0,
    index: 0,
    end: Math.ceil((itemHeight * 2) / rowHeight)
  });

  const onScroll = ({ target }) => {
    let scrollTop = target.scrollTop
    let index = Math.floor(scrollTop / rowHeight);
    setScroll({
      index: index,
      top: (scrollTop / rowHeight) * rowHeight,
      end: index + Math.ceil((itemHeight * 2) / rowHeight)

    })
  }
  const generateRows = () => {
    let index = scroll.index
    let end = scroll.end
    let items = []
    console.log('index', index);
    console.log('end', end);
    do {
      if (index >= rows.length) {
        index = rows.length;
        break;
      }
      const rowAttrs = {
        style: {
          position: "absolute",
          top: (index * rowHeight),
          height: rowHeight,
          lineHeight: `${rowHeight}px`
        },

      }
      items.push(
        <li className='row-list'  {...rowAttrs} key={index}>
          <span className='li-row-span'>
            Ticket NO:  {rows[index].id}
          </span>
          <span className='li-row-span'>
            {rows[index].subject}
          </span>
          <span className='li-row-span'>
            {rows[index].priority}
          </span>
          <span className='li-row-span'>
            {rows[index].status}
          </span>
          <span className='li-row-span'>
            {rows[index].description}
          </span>
          <span>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <ModeEditIcon />
            </IconButton>
          </span>

        </li >
      )

      index++
    } while (index < end)
    return items
  }

  const tableAttrs = {
    className: 'table-content',
    style: {
      height: (itemHeight > tableHeight)
        ? tableHeight + 2
        : itemHeight
    },
    onScroll: onScroll
  }

  const tbodyAttr = {
    style: {
      position: "relative",
      display: 'inline-block',
      height: tableHeight,
      maxHeight: tableHeight,
      width: "100%"
    }
  }
  return (
    <div className='container-list' >

      <ul {...tableAttrs} className="dev-content" >
        <div {...tbodyAttr}>
          {generateRows()}
        </div>
      </ul>
    </div>

  )
}

export default ListTickets;