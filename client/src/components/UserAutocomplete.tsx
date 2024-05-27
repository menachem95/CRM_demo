import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash/debounce";

interface User {
  id: string;
  name: string;
}

const API_URI = process.env.REACT_APP_API_SERVER as string;

const UserAutocomplete: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [options, setOptions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setOptions([]);
        return;
      }
      console.log("query", query)
      setLoading(true);
      try {
        const response = await fetch(`${API_URI}users?query=${query}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="user"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option: User) => `${option.id} - ${option.name}`}
            onInputChange={(event, value) => fetchUsers(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="User"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            onChange={(event, value) => field.onChange(value)}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserAutocomplete;
