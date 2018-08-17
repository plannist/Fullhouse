package com.team.station4.map.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.team.station4.estate.model.EstateDTO;
import com.team.station4.main.model.MainDTO;
import com.team.station4.map.model.BuildDTO;
import com.team.station4.map.vo.PagingVo;
import com.team.station4.room.model.RequestDTO;
import com.team.station4.staff.model.StaffDTO;
import com.team.station4.uploadroom.model.AddInfoDTO;
import com.team.station4.uploadroom.model.PriceDTO;

public interface MapDAO {

	List<BuildDTO> mapList(Map jsonLatLng);
	int countCluster(Map jsonLatLng);
	List<BuildDTO> location();
	List<BuildDTO>latLng(HashMap hm);
	
	/* jsl */
	int countBuild(Map hm);
	List<BuildDTO> selectDeleteList(Map hm);
	void deleteAddinfo(BuildDTO buildDTO);
	void deletePrice(BuildDTO buildDTO);
	void deleteRequest(BuildDTO buildDTO);
	void deleteReservation(BuildDTO buildDTO);
	void deleteBuilding(Map hm);
	void deleteStaff(Map hm);
	List<BuildDTO> selectBuildRequest(int estate_no);
	Map<String, Object> selectRequest(Map rMap);
	void deleteRequestDoneCall(int request_no);
	
	List<BuildDTO>clusterList(Map hm);

	void memHotUpdate(HashMap<String, Object> hm);
	int memHotSelect(HashMap<String, Object> hm);
	void memHotDelete(HashMap<String, Object> hm);
	String myHot(String email);
	BuildDTO hotList(int parseInt);
	String myRecent(String email);
	BuildDTO recentList(int parseInt);
	int memRecentSelect(HashMap<String, Object> hm);
	void memRecentUpdate(HashMap<String, Object> hm);
	List<BuildDTO> hotListPaging(Map<String, Object> jsonLatLng);
	List<PriceDTO> priceSelect(BuildDTO dto);


	
}
