import { Input } from "@chakra-ui/react";

const LvTwo = () => {
  return (
    <div className="level-2">
      <form>
        <div className="inputs">
          <label>Bvn</label>
          <Input variant="outline" name="last-name" type="text" size="lg" />
        </div>
        <div className="inputs">
          <label>Phone number</label>
          <Input variant="outline" name="last-name" type="text" size="lg" />
        </div>
        <div className="inputs">
          <label>Date of birth</label>
          <Input variant="outline" name="last-name" type="date" size="lg" />
        </div>
      </form>
    </div>
  );
};

export default LvTwo;
