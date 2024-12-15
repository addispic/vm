import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";

// icons
// delete
import { RiDeleteBin6Line } from "react-icons/ri";
// warning
import { IoIosWarning } from "react-icons/io";
// add
import { IoMdAdd } from "react-icons/io";
// close
import { IoMdClose } from "react-icons/io";
// camera
import { MdCameraAlt } from "react-icons/md";
// down
import { FaChevronDown } from "react-icons/fa6";
// edit
import { CiEdit } from "react-icons/ci";
// search
import { CiSearch } from "react-icons/ci";
// filter
import { CiFilter } from "react-icons/ci";

// config
import { BASE_URI } from "../../config";

// user name
import Username from "../user/user-sub-pages/Username";

// slices
// vehicles
import {
  addNewVehicle,
  vehiclesSelector,
  deleteVehicle,
  isVehicleDeletingSelector,
  isNewVehicleUploadingSelector,
  isVehicleUploadingDoneSelector,
  updateVehicle,
  isVehicleUpdatingSelector,
} from "../../features/vehicles/vehicles.slice";
// users
import { userSelector } from "../../features/users/users.slice";

const Home = () => {
  // states from slice
  // user
  const user = useSelector(userSelector);
  // vehicles
  const vehicles = useSelector(vehiclesSelector);
  // is new vehicle uploading
  const isNewVehicleUploading = useSelector(isNewVehicleUploadingSelector);
  // is vehicle uploading done
  const isVehicleUploadingDone = useSelector(isVehicleUploadingDoneSelector);
  // is vehicle uploading done
  const isVehicleUpdating = useSelector(isVehicleUpdatingSelector);

  // local
  // local vehicles
  const [localVehicles, setLocalVehicles] = useState([]);
  // name filter
  const [nameFilter, setNameFilter] = useState("");
  // is new on
  const [isNewOn, setIsNewOn] = useState(false);
  // file
  const [file, setFile] = useState(null);
  // update file
  const [updateFile, setUpdateFile] = useState(null);
  // name
  const [name, setName] = useState("");
  // update name
  const [updateName, setUpdateName] = useState("");
  // status
  const [status, setStatus] = useState({
    options: [
      {
        text: "Available",
      },
      {
        text: "In Production",
      },
      {
        text: "In Service",
      },
      {
        text: "Retired",
      },
      {
        text: "Sold",
      },
    ],
    selected: "",
    isOn: false,
  });
  // status
  const [filter, setFilter] = useState({
    options: [
      {
        text: "Available",
      },
      {
        text: "In Production",
      },
      {
        text: "In Service",
      },
      {
        text: "Retired",
      },
      {
        text: "Sold",
      },
    ],
    selected: "",
    isOn: false,
  });
  // update status
  const [updateStatus, setUpdateStatus] = useState({
    options: [
      {
        text: "Available",
      },
      {
        text: "In Production",
      },
      {
        text: "In Service",
      },
      {
        text: "Retired",
      },
      {
        text: "Sold",
      },
    ],
    selected: "",
    isOn: false,
  });
  // is vehicle deleting
  const isVehicleDeleting = useSelector(isVehicleDeletingSelector);

  // update vehicle
  const [isUpdateVehicle, setIsUpdateVehicle] = useState(null);
  // delete vehicle
  const [isDeleteVehicle, setIsDeleteVehicle] = useState(null);

  // dispatch
  const dispatch = useDispatch();

  // hide the pop up after deleting
  useEffect(() => {
    setIsDeleteVehicle(null);
  }, [vehicles]);

  // hide pop up after adding the vehicle

  // form submit handler
  const formSubmitHandler = () => {
    if (status.selected && name.trim() && file) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", file);
      formData.append("status", status.selected);
      dispatch(addNewVehicle(formData));
    }
  };

  // update vehicle form handler
  const updateVehicleFormHandler = () => {
    dispatch(
      updateVehicle({
        _id: isUpdateVehicle._id,
        name: updateName,
        status: updateStatus.selected,
        file: updateFile,
      })
    );
  };

  useEffect(() => {
    setIsNewOn(false);
    setName("");
    setFile(null);
    setStatus((prev) => {
      return {
        ...prev,
        isOn: false,
        selected: "",
      };
    });
  }, [isVehicleUploadingDone]);

  useEffect(() => {
    setIsUpdateVehicle(null);
  }, [isVehicleUpdating]);

  // filter by name handler
  const filterByNameHandler = () => {
    if (nameFilter) {
      let filteredVehicles = vehicles.filter((vi) =>
        vi.name?.startsWith(nameFilter)
      );
      setLocalVehicles(filteredVehicles);
    } else {
      setLocalVehicles(vehicles);
    }
  };

  let finalsV = localVehicles.length || nameFilter ? localVehicles : vehicles;

  return (
    <div className="h-[93vh] flex flex-col">
      {/* header */}
      <header className="flex items-center justify-between gap-x-1.5 bg-neutral-100  mt-1.5 rounded-md px-3 py-1.5">
        {/* search by name */}
        <div>
          <div className="min-w-32 lg:min-w-64 flex items-center gap-x-1.5 border border-neutral-200 rounded-md px-3 py-1 text-sm">
            <input
              className="w-full focus:ring-0 focus:outline-none border-none bg-transparent"
              placeholder="Search vehicle by name"
              type="text"
              value={nameFilter}
              onChange={(e) => {
                setNameFilter(e.target.value);
              }}
              onKeyUp={() => {
                filterByNameHandler();
              }}
            />
            <CiSearch className="text-xl" />
          </div>
        </div>
        <div className="flex items-center gap-x-1.5">
          {/* filter */}
          <div className="flex items-center gap-x-1.5">
            <div className="flex items-center gap-x-1">
              <CiFilter />
              <span className="text-sm text-neutral-500 hidden md:inline-block">
                Filter
              </span>
            </div>
            <div className="relative">
              {/* span */}
              <div
                onClick={() => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      isOn: !prev.isOn,
                    };
                  });
                }}
                className="cursor-pointer flex items-center gap-x-3 border border-neutral-300 px-3 py-1 text-sm rounded-md"
              >
                <span>{filter.selected || "select"}</span>
                <FaChevronDown
                  className={`transition-transform text-sm text-neutral-500 ease-in-out duration-150 ${
                    filter.isOn ? "-rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {/* pop up */}
              {filter.isOn && (
                <div className="absolute right-0 top-[105%] bg-white p-1.5 rounded-md shadow-lg z-50 whitespace-nowrap text-sm text-neutral-500">
                  {filter.options.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setFilter((prev) => {
                            return {
                              ...prev,
                              selected: item.text,
                              isOn: false,
                            };
                          });
                        }}
                        key={item.text}
                        className="cursor-pointer border-b border-neutral-200 hover:bg-neutral-100 p-0.5"
                      >
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {/* add new */}
          <div>
            <button
              onClick={() => {
                setIsNewOn(true);
              }}
              className="w-[24px] aspect-square rounded-sm flex items-center justify-center bg-neutral-200 text-neutral-400 hover:bg-neutral-300 hover:text-neutral-600"
            >
              <IoMdAdd />
            </button>
          </div>
        </div>
      </header>
      {/* vehicles content */}
      <div
        className={`flex-grow overflow-y-auto px-[3%] pt-[1vh] relative ${
          user ? "max-h-[88vh]" : "max-h-[93vh]"
        }`}
      >
        {finalsV?.length > 0 ? (
          <>
            {finalsV.map((vehicleItem) => {
              return (
                <div
                  key={vehicleItem._id}
                  className=" border-b border-neutral-200 py-2.5"
                >
                  {/* vehicle detail */}
                  <div className="flex items-center justify-between gap-x-12">
                    {/* left */}
                    <div className="flex items-center justify-between flex-1">
                      {/* vehicle detail */}
                      <div className="flex items-center gap-x-1.5">
                        {/* image */}
                        <div className="w-[36px] aspect-square rounded-full overflow-hidden bg-neutral-300 text-3xl text-neutral-500">
                          <img
                            className="w-full h-full object-center object-cover"
                            src={`${BASE_URI}/${vehicleItem.image}`}
                            alt=""
                          />
                        </div>
                        {/* text */}
                        <div>
                          {/* name */}
                          <p>{vehicleItem.name}</p>
                          <p className="md:hidden text-sm text-orange-600">
                            Status: {vehicleItem.status}
                          </p>
                          <span className="sm:hidden text-neutral-500 ml-1.5 text-xs">
                            updated:
                            {formatDistanceToNow(
                              new Date(vehicleItem.updatedAt),
                              { addSuffix: true }
                            )}
                          </span>
                          {/* author detail */}
                          <div className="text-xs">
                            <p>
                              By{" "}
                              <span className="text-green-600">
                                <Username _id={vehicleItem.userId} />
                              </span>{" "}
                              <span className="text-neutral-500 ml-3">
                                {formatDistanceToNow(
                                  new Date(vehicleItem.createdAt),
                                  { addSuffix: true }
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* status */}
                      <div className="hidden md:inline-block">
                        <p className="text-sm text-neutral-500">status</p>
                        <p
                          className={`text-sm ${
                            vehicleItem.status === "Available"
                              ? "text-green-600"
                              : vehicleItem.status === "In Production"
                              ? "text-orange-500"
                              : vehicleItem.status === "In Service"
                              ? "text-red-600"
                              : vehicleItem.status === "Retired"
                              ? "text-blue-700"
                              : vehicleItem.status === "Sold"
                              ? "text-neutral-800"
                              : ""
                          }`}
                        >
                          {vehicleItem.status}
                        </p>
                      </div>
                      {/* modified */}
                      <div className="hidden sm:inline-block">
                        <p className="text-sm text-neutral-500">
                          last modified
                        </p>
                        <p className="text-sm text-green-500">
                          {formatDistanceToNow(
                            new Date(vehicleItem.updatedAt),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>
                    {/* right */}
                    {user?._id === vehicleItem?.userId && (
                      <div className="self-start flex items-center gap-1.5">
                        <button
                          className="w-[20px] aspect-square rounded-sm bg-green-100 flex items-center justify-center text-green-500 transition-colors ease-in-out duration-150 hover:bg-green-200 hover:text-green-600"
                          onClick={() => {
                            setIsUpdateVehicle(vehicleItem);
                            setUpdateName(vehicleItem.name);
                            setUpdateStatus((prev) => {
                              return {
                                ...prev,
                                selected: vehicleItem.status,
                              };
                            });
                          }}
                        >
                          <CiEdit />
                        </button>
                        <button
                          className="w-[20px] aspect-square rounded-sm bg-red-50 flex items-center justify-center text-red-300 transition-colors ease-in-out duration-150 hover:bg-red-200 hover:text-red-600"
                          onClick={() => {
                            setIsDeleteVehicle(vehicleItem);
                          }}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>No Result Yet</>
        )}
      </div>

      {user ? (
        <>
          <div className="relative flex items-center justify-center">
            {/* button */}
            <button
              onClick={() => {
                setIsNewOn(true);
              }}
              className="flex items-center gap-x-1 bg-neutral-200 rounded-sm text-sm px-1.5 py-1 transition-all ease-in-out duration-150 hover:bg-neutral-300"
            >
              <IoMdAdd className="text-lg" />
              <span>Add New Vehicle</span>
            </button>
            {/* add pop up */}
            {isNewOn && (
              <div className="fixed left-0 top-0 w-screen h-screen z-50 bg-black bg-opacity-20">
                <div className="min-w-96 bg-white shadow-lg rounded-lg p-5 left-1/2 -translate-x-1/2 top-[15%] absolute">
                  <header className="flex items-center justify-between">
                    {/* left */}
                    <div>
                      <h3 className="text-green-600 font-medium">
                        Add New Vehicle
                      </h3>
                    </div>
                    {/* right */}
                    <div>
                      <button
                        onClick={() => {
                          setIsNewOn(false);
                          setName("");
                          setFile(null);
                          setStatus((prev) => {
                            return {
                              ...prev,
                              isOn: false,
                              selected: "",
                            };
                          });
                        }}
                        className="w-[20px] aspect-square rounded-md bg-red-100 flex items-center justify-center text-red-600 transition-colors ease-in-out duration-150 hover:bg-red-200"
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  </header>
                  {/* inputs */}
                  <div className="mt-4">
                    {/* vehicle profile */}
                    <div>
                      <input
                        onChange={(e) => {
                          setFile(e.target.files?.[0]);
                        }}
                        type="file"
                        id="vehicle-photo"
                        accept="image/*"
                        hidden
                      />
                      <label
                        htmlFor="vehicle-photo"
                        className="w-max flex items-center gap-x-1.5"
                      >
                        <div className="w-[50px] aspect-square rounded-full overflow-hidden bg-neutral-300 cursor-pointer text-neutral-600 flex items-center justify-center text-3xl">
                          {/* icon */}
                          {file ? (
                            <img
                              className="w-full h-full object-center object-cover"
                              src={URL.createObjectURL(file)}
                            />
                          ) : (
                            <MdCameraAlt />
                          )}
                        </div>
                        <div className="text-neutral-500 text-sm">
                          {file ? (
                            <div>
                              <p>{file.name}</p>
                              <p className="text-xs text-neutral-500 mt-[-2px]">
                                {file.size / 1000}kb
                              </p>
                            </div>
                          ) : (
                            <span>vehicle image</span>
                          )}
                        </div>
                      </label>
                    </div>
                    {/* vehicle name */}
                    <div className="mt-3 w-full flex items-center border border-neutral-300 p-1.5 rounded-md">
                      <input
                        className="w-full focus:ring-0 focus:outline-none bg-transparent border-none text-sm p-0"
                        type="text"
                        placeholder="Vehicle name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {/* vehicle status */}
                    <div className="mt-5">
                      {/* display */}
                      <div
                        onClick={() => {
                          setStatus((prev) => {
                            return {
                              ...prev,
                              isOn: !prev.isOn,
                            };
                          });
                        }}
                        className="flex items-center justify-between p-1.5 border border-neutral-300 rounded-md text-sm cursor-pointer"
                      >
                        <span
                          className={`${
                            status.selected ? "text-black" : "text-neutral-500"
                          }`}
                        >
                          {status.selected || "Select vehicle status"}
                        </span>
                        <FaChevronDown
                          className={`text-neutral-500 transition-transform ease-in-out duration-150 ${
                            status.isOn ? "-rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                      {/* option */}
                      <div
                        className={`mt-2 overflow-hidden ${
                          status.isOn ? "h-auto" : "h-0"
                        }`}
                      >
                        <div className="p-2 bg-white shadow-lg">
                          {status.options.map((item, index) => {
                            return (
                              <div
                                onClick={() => {
                                  setStatus((prev) => {
                                    return {
                                      ...prev,
                                      selected: item.text,
                                      isOn: false,
                                    };
                                  });
                                }}
                                key={item.text}
                                className="border-b border-neutral-200 p-0.5 cursor-pointer hover:border-neutral-400 hover:bg-neutral-100 px-1.5 transition-colors ease-in-out duration-150"
                              >
                                <span>{item.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {/* button */}
                    <div>
                      {isNewVehicleUploading ? (
                        <div className="w-[28px] aspect-square rounded-full border-4 border-green-600 border-r-transparent animate-spin" />
                      ) : (
                        <button
                          onClick={formSubmitHandler}
                          className="mt-3 text-sm px-3.5 py-1.5 rounded-md bg-green-600 text-white transition-colors ease-in-out duration-150 hover:bg-green-500"
                        >
                          Add New Vehicle
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      {/* update vehicle */}
      {isUpdateVehicle && (
        <div className="fixed left-0 top-0 w-screen h-screen z-50 bg-black bg-opacity-20">
          <div className="min-w-96 bg-white shadow-lg rounded-lg p-5 left-1/2 -translate-x-1/2 top-[15%] absolute">
            <header className="flex items-center justify-between">
              {/* left */}
              <div>
                <h3 className="text-green-600 font-medium">Update Vehicle</h3>
              </div>
              {/* right */}
              <div>
                <button
                  onClick={() => {
                    setName("");
                    setUpdateFile(null);
                    setUpdateName("");
                    setStatus((prev) => {
                      return {
                        ...prev,
                        isOn: false,
                        selected: "",
                      };
                    });
                    setIsUpdateVehicle(null);
                  }}
                  className="w-[20px] aspect-square rounded-md bg-red-100 flex items-center justify-center text-red-600 transition-colors ease-in-out duration-150 hover:bg-red-200"
                >
                  <IoMdClose />
                </button>
              </div>
            </header>
            {/* inputs */}
            <div className="mt-4">
              {/* vehicle profile */}
              <div>
                <input
                  onChange={(e) => {
                    setUpdateFile(e.target.files?.[0]);
                  }}
                  type="file"
                  id="vehicle-photo"
                  accept="image/*"
                  hidden
                />
                <label
                  htmlFor="vehicle-photo"
                  className="w-max flex items-center gap-x-1.5"
                >
                  <div className="w-[50px] aspect-square rounded-full overflow-hidden bg-neutral-300 cursor-pointer text-neutral-600 flex items-center justify-center text-3xl">
                    {/* icon */}
                    {updateFile ? (
                      <img
                        className="w-full h-full object-center object-cover"
                        src={URL.createObjectURL(updateFile)}
                      />
                    ) : (
                      <img
                        className="w-full h-full object-center object-cover"
                        src={`${BASE_URI}/${isUpdateVehicle.image}`}
                      />
                    )}
                  </div>
                  <div className="text-neutral-500 text-sm">
                    <div>
                      <p>{updateName || isUpdateVehicle.name}</p>
                      <p className="text-xs text-neutral-500 mt-[-2px]">
                        {updateFile && <>{updateFile.size / 1000}kb</>}
                        {/* {file.size / 1000}kb */}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              {/* vehicle name */}
              <div className="mt-3 w-full flex items-center border border-neutral-300 p-1.5 rounded-md">
                <input
                  className="w-full focus:ring-0 focus:outline-none bg-transparent border-none text-sm p-0"
                  type="text"
                  placeholder="Vehicle name"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </div>
              {/* vehicle status */}
              <div className="mt-5">
                {/* display */}
                <div
                  onClick={() => {
                    setUpdateStatus((prev) => {
                      return {
                        ...prev,
                        isOn: !prev.isOn,
                      };
                    });
                  }}
                  className="flex items-center justify-between p-1.5 border border-neutral-300 rounded-md text-sm cursor-pointer"
                >
                  <span
                    className={`${
                      updateStatus.selected ? "text-black" : "text-neutral-500"
                    }`}
                  >
                    {updateStatus.selected}
                  </span>
                  <FaChevronDown
                    className={`text-neutral-500 transition-transform ease-in-out duration-150 ${
                      status.isOn ? "-rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                {/* option */}
                <div
                  className={`mt-2 overflow-hidden ${
                    updateStatus.isOn ? "h-auto" : "h-0"
                  }`}
                >
                  <div className="p-2 bg-white shadow-lg">
                    {updateStatus.options.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            setUpdateStatus((prev) => {
                              return {
                                ...prev,
                                selected: item.text,
                                isOn: false,
                              };
                            });
                          }}
                          key={item.text}
                          className="border-b border-neutral-200 p-0.5 cursor-pointer hover:border-neutral-400 hover:bg-neutral-100 px-1.5 transition-colors ease-in-out duration-150"
                        >
                          <span>{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* button */}
              <div>
                {!true ? (
                  <div className="w-[28px] aspect-square rounded-full border-4 border-green-600 border-r-transparent animate-spin" />
                ) : (
                  <button
                    onClick={updateVehicleFormHandler}
                    className="mt-3 text-sm px-3.5 py-1.5 rounded-md bg-green-600 text-white transition-colors ease-in-out duration-150 hover:bg-green-500"
                  >
                    Update vehicle
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* delete vehicle item pop up */}
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-black/35 z-50 ${
          isDeleteVehicle ? "scale-100" : "scale-0"
        }`}
      >
        {/* confirm screen */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-5">
          {isVehicleDeleting ? (
            <div>
              <p>Vehicle Deleting...</p>
            </div>
          ) : (
            <>
              {/* icon */}
              <div className="flex items-center justify-center mb-1.5">
                <div className="w-[24px] aspect-square rounded-full border border-red-500 flex items-center justify-center text-red-500 bg-red-100">
                  <IoIosWarning />
                </div>
              </div>
              {/* text */}
              <div className="text-center">
                <p className="text-gray-700">
                  Are you sure to delete this vehicle ?
                </p>
                <p className="text-sm text-red-500 italic">
                  Remember this action is undone.
                </p>
              </div>
              {/* buttons */}
              <div className="flex items-center justify-evenly mt-3">
                <button
                  className="px-3 py-0.5 rounded-sm text-sm bg-gray-500 text-white transition-colors ease-in-out duration-150 hover:bg-gray-400"
                  onClick={() => {
                    setIsDeleteVehicle(null);
                  }}
                >
                  cancel
                </button>

                <button
                  className="px-3 py-0.5 rounded-sm text-sm bg-red-500 text-white transition-colors ease-in-out duration-150 hover:bg-red-400"
                  onClick={() => {
                    dispatch(deleteVehicle(isDeleteVehicle?._id));
                  }}
                >
                  delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
