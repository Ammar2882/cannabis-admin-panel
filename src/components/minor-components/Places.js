import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { useAlert } from 'react-alert'
import "@reach/combobox/styles.css";
import { axiosInstance } from "../../constants/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { selectProgressBarState } from "../../redux/Actions/ProgressBarActions";
import { Loader } from "./Loader";
//map constants

const containerStyle = {
  width: "90%",
  height: '80vh'
};
const center = { lat: 40.7810694898019, lng: -102.88417905250878 }

export default function Places() {
  const [selected, setSelected] = useState(null);
  const [radius, setRadius] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('')
  const [placesArr, setPlacesArr] = useState([])
  const [newRadius , setNewRadius] = useState({})
  const [render, setRender] = useState(false)
  const alert = useAlert()

  const dispatch = useDispatch()
  const loading = useSelector(
    (state) => state.ProgressBarReducer
  );
  const token = useSelector(
    (state) => state.ProfileReducer
  );

  useEffect(() => {
    if(token){
      getRadius()
    }
  }, [render,token])
  const getRadius = async () => {
    dispatch(selectProgressBarState(true))
    const res = await axiosInstance.get('/api/v1/admin/getradius',{
      headers:{
        authorization:token
      }
    })
    if (res.data.success) {
      dispatch(selectProgressBarState(false))
      setPlacesArr(res.data.data)
    }
    else {
      dispatch(selectProgressBarState(false))
      alert.show('No Radius Found')
    }
  }
  const deleteRadius = async (id)=>{
    dispatch(selectProgressBarState(true))
    let options = {
      params: {
          id:id     
      }, 
      headers: {
          "Authorization":token
      }
  }
    const res = await axiosInstance.delete('/api/v1/admin/deleteradius',options)
    if (res.data.success) {
      dispatch(selectProgressBarState(false))
      alert.show('radius deleted successfully',
        {
          onClose: () => {
            setRender(!render)
          }
        })
    }
    else {
      dispatch(selectProgressBarState(false))
      alert.show('could not delete radius')
    }
  }
  const setRadiusApi = async (obj) => {
    dispatch(selectProgressBarState(true))
    const res = await axiosInstance.post('/api/v1/admin/setradius', obj,{
      headers:{
        authorization:token
      }
    })
    if (res.data.success) {
      dispatch(selectProgressBarState(false))
      alert.show('radius added successfully',
        {
          onClose: () => {
            setRender(!render)
          }
        })
    }
    else {
      dispatch(selectProgressBarState(false))
      alert.show('could not save radius')
    }
  }

  return (
    <>
      {!loading ? (
        <div className='divide-y py-8 divide-gray-100 bg-white rounded-lg  shadow-lg'>
          <div className="flex flex-col items-center justify-between gap-4">
            <PlacesAutocomplete setSelected={setSelected} selected={selected} radius={radius} setRadius={setRadius} setFormattedAddress={setFormattedAddress} />
            <Map selected={selected} radius={radius} />
            {selected && radius &&
              <button onClick={() => {
                let obj = {
                  geometry: { coordinates: [selected.lat, selected.lng] },
                  radius: radius,
                  formattedAddress: formattedAddress
                }
                setRadiusApi(obj)
                setRadius('')
                setSelected(null)
                setFormattedAddress('')
              }} className='py-2 px-4 bg-myBg text-xs rounded-lg hover:bg-[#efca37]'>
                Add Place
              </button>
            }
          </div>
          {
            placesArr.length > 0 ?
              <div className="mx-8">
                <Areas placesArr={placesArr} setPlacesArr={setPlacesArr} setRadiusApi={setRadiusApi} deleteRadius={deleteRadius} />
              </div>
              :
              null
          }
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

function Map({ selected, radius }) {
  const options = {
    strokeColor: '#000000',
    strokeOpacity: 0.8,
    strokeWeight: 0.5,
    fillColor: '#000000',
    fillOpacity: 0.4,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius,
    zIndex: 1
  }
  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selected ? selected : center}
        zoom={selected ? 15 : 5}
      >

        {selected &&
          <Marker position={selected} />}
        {selected && radius && <Circle
          center={selected}
          options={options}
        />}
      </GoogleMap>
    </>
  );
}


const PlacesAutocomplete = ({ setSelected, selected, setRadius, radius, setFormattedAddress }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setFormattedAddress(results[0].formatted_address)
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <div className="flex items-center gap-4">
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="h-10 px-4 bg-blue-100 rounded-full w-96 text-xs outline-0  hover:outline-0 focus:outline-none"
          placeholder="Search an address"
        />
        {
          selected && <input value={radius} onChange={(e) => setRadius(parseFloat(e.target.value))} className="h-10 px-4 bg-blue-100 rounded-full w-96 text-xs outline-0  hover:outline-0 focus:outline-none " type="number" name="search" placeholder="set radius in meters" />
        }

      </div>
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const Areas = ({ placesArr, setPlacesArr, setRadiusApi,deleteRadius}) => {
  return (
    <div className="flex flex-col  justify-center h-full py-4">
      <div className="w-full  mx-auto bg-white shadow-lg rounded-sm ">
        <div className="py-3 ">
          <div className="overflow-x-auto ">
            <table className="table-auto w-full ">
              <thead className="text-sm w-full h-14 bg-myBg font-semibold uppercase text-gray-600 ">
                <tr>
                  <th key={1} className="p-2 whitespace-nowrap font-semibold text-left">
                    Address
                  </th>
                  <th key={2} className="p-2 whitespace-nowrap font-semibold text-left">
                    Coordinates (lat - lng)
                  </th>
                  <th key={3} className="p-2 whitespace-nowrap font-semibold text-left">
                    Radius (m)
                  </th>
                  <th key={4} className="p-2 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm  divide-gray-100">
                {placesArr.map((item, index) => (
                  <tr key={index}>
                    <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <p className={`text-left text-md `}> {item.formattedAddress}</p>
                    </td>
                    <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <p className={`text-left text-md `}> {item.geometry.coordinates.join(" - ")}</p>
                    </td>
                    <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <p className={`text-left text-md `}> {item.radius}</p>
                    </td>
                    <td className={`text-left  px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <p className={`text-left text-md `}>
                        <button
                          onClick={() => deleteRadius(item._id)}
                          className='py-2 px-4 bg-myBg text-xs rounded-lg hover:bg-[#efca37]'>
                          Remove
                        </button>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* {console.log(count, "---", placesArr.length)}
      {count !== placesArr.length ?
        <button
          onClick={() => setRadiusApi()}
          className='py-2 mx-auto my-4 px-4 bg-myBg text-xs rounded-lg hover:bg-[#efca37]'>
          Update
        </button>
        :
        null} */}
    </div>
  )
}