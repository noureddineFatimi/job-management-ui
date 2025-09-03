import { memo } from "react";
import { Pagination } from "antd";

const PaginationBlock = memo(function PaginationBlock({ onChangeLoading, scroll, total, limit, searchQueryParams, setSearchQueryParams}){

    return <div style={{width:"100%" , display:"flex", justifyContent:"center", marginBottom:"0.5rem"}}><Pagination current={searchQueryParams.get("page")} onChange={(page) =>{ 
        const params = new URLSearchParams(searchQueryParams)
        params.set("page",page)
          setSearchQueryParams(params)
          onChangeLoading(true)
          scroll()
        }} total={total} pageSize={limit} showSizeChanger = {false}/>
        </div>
})

export default PaginationBlock