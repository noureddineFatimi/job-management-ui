import { memo } from "react";
import { Pagination } from "antd";

const PaginationBlock = memo(function PaginationBlock({onChangeCurrentPage, onChangeLoading, scroll, total, limit, currentPage}){

    return <div style={{width:"100%" , display:"flex", justifyContent:"center", marginBottom:"0.5rem"}}><Pagination current={currentPage} onChange={(page) =>{ 
          onChangeCurrentPage(prev => ({currentPage: page, tick: prev.tick + 1}) )
          onChangeLoading(true)
          scroll()
        }} total={total} pageSize={limit} showSizeChanger = {false}/>
        </div>
})

export default PaginationBlock