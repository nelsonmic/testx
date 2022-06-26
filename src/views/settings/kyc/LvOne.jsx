import { Input } from "@chakra-ui/react";

const LvOne = () => {
  return (
    <div className="level-1">
      <form>
        <div className="inputs">
          <label>Last name</label>
          <Input variant="outline" name="last-name" type="text" size="lg" />
        </div>
        <div className="inputs">
          <label>Other names</label>
          <Input variant="outline" name="last-name" type="text" size="lg" />
        </div>
        <div className="inputs">
          <label>Phone number</label>
          <Input variant="outline" name="last-name" type="text" size="lg" />
        </div>

        <div className="inputs">
          <label>Means of ID</label>
          <Input variant="outline" name="last-name" type="text" size="lg" />
        </div>

        <div className="inputs">
          <label>ID number</label>
          <Input variant="outline" name="last-name" type="text" size="lg" />
        </div>

        <div className="inputs">
          <label>Expiry date</label>
          <Input variant="outline" name="last-name" type="date" size="lg" />
        </div>
      </form>
    </div>
  );
};

export default LvOne;
