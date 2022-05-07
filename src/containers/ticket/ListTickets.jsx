import React from 'react'

function ListTickets({ rows, rowHeight, windowHeight, itemHeight, renderItem, ...props }) {
  const tableHeight = rowHeight * rows.length;

  const [scroll, setScroll] = React.useState({
    top: 0,
    index: 0,
    end: Math.ceil((itemHeight * 2) / rowHeight)
  });

  
// on scroll function to set new values of seen rows 
  const onScroll = ({ target }) => {
    let scrollTop = target.scrollTop
    let index = Math.floor(scrollTop / rowHeight);
    setScroll({
      index: index,
      top: (scrollTop / rowHeight) * rowHeight,
      end: index + Math.ceil((itemHeight * 2) / rowHeight)

    })
  }
// generate rows just to seen rows in the list and changed while scroll 
  const generateRows = () => {
    let index = scroll.index
    let end = scroll.end
    let items = []
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
          <span className='li-row-span li-Title'>
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