import React, { useEffect, useState } from "react";

import { gitStore } from "@root/root";
import { RepoBranches } from "@store/GitHubStore/types";
import { Drawer } from "antd";
import { List } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useReposContext } from "../../App";

type RepoBranchesDrawerProps = {
    onClose: () => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose }) => {
    const [branches, setBranches] = useState<RepoBranches[] | null>(null);
    const { repoName } = useParams();
    const repoContext = useReposContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (repoContext.list[0] === undefined) {
            navigate("/repos");
        } else {
            setBranches([]);
            const func = async () => {
                const result = await gitStore.getOrganizationRepoBranchesList({
                    organizationName: repoContext.list[0].orgName,
                    repoName: repoName,
                });
                setBranches(result.success ? result.data : []);
            };

            if (repoName !== undefined) func();
        }
    }, [repoName]);

    return (
        <>
            {repoName !== undefined && (
                <Drawer
                    onClose={onClose}
                    title={repoName}
                    size="large"
                    visible={true}
                >
                    <h3>Branches:</h3>
                    <List
                        dataSource={branches?.map((element) => {
                            return <div key={element.name}>{element.name}</div>;
                        })}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </Drawer>
            )}
        </>
    );
};

export default RepoBranchesDrawer;
